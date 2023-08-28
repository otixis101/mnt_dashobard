import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Image from "next/image";
import { Formik, Form } from "formik";
import { CardFormValidationSchema } from "@/base/helpers/FormValidationSchemas";
import cardImage from "public/assets/card img.png";
import { cn } from "@/base/utils";
import StripeCardElement from "@/components/atoms/StripeCardElement";
import { toast } from "react-toastify";
import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Axios from "@/base/axios";
import { useSession } from "next-auth/react";

interface FormPayload {
  nameOnCard: string;
  // number: string;
  /** convert to number */
  // exp_month: string;
  /** convert to number */
  // exp_year: string;
  // cvc: string;
}

interface Options {
  name: keyof FormPayload;
  placeholder: string;
  label: string;
  className?: string;
}

export const options: Options[] = [
  {
    name: "nameOnCard",
    placeholder: "Enter Name on card",
    label: "Name on card",
  },
];

interface Props {
  hideShadows?: true;
  className?: string;
  onSubmit(data: FormPayload): Promise<void> | void;
}

const showMessage = (msg?: string, type: "error" | "success" = "error") => {
  toast[type](
    msg ?? "An error occurred while making payment, please try again"
  );
};

const PaymentCardDetails = ({ hideShadows, className, onSubmit }: Props) => {
  const [completed, setCompleted] = useState(false);
  const { data: session, update } = useSession();

  const stripe = useStripe();
  const elements = useElements();

  const handleCardDetailsSubmit = async (
    values: FormPayload
  ): Promise<void> => {
    if (!completed) {
      showMessage("Please enter card details");
      return;
    }

    if (!stripe || !elements) {
      showMessage();
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      showMessage();
      return;
    }

    const { paymentMethod, error: stripeError } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
          name: values.nameOnCard,
        },
      });

    if (stripeError) {
      showMessage(stripeError?.message);
      return;
    }

    try {
      const payload = {
        paymentMethodId: paymentMethod.id,
        cardLastNumber: paymentMethod.card?.last4 ?? "N/A",
        cardName: values.nameOnCard,
      };

      const res = await Axios.post("stripe-payment/save-card", payload, {
        headers: {
          authorization: `Bearer ${session?.user.accessToken}`,
        },
      });

      if (res.data) {
        const { setupIntent, error: setupError } =
          await stripe.confirmCardSetup(res.data.data.client_secret, {
            payment_method: { card },
          });

        if (setupIntent) {
          update({
            ...session,
            user: {
              ...session?.user,
              stripeCustomerId: res.data.data.customer,
            },
          });
          await onSubmit(values);
        } else {
          showMessage(setupError?.message);
        }
      }
    } catch (error) {
      showMessage(String(error));
    }
  };

  return (
    <div
      className={cn(
        "flex max-w-[670px] items-center justify-center gap-x-1 gap-y-4 rounded-3xl py-16 max-md:px-4 xs:gap-x-5 md:gap-x-10 md:pl-10 md:pr-0",
        !hideShadows && "shadow-[0px_0px_8px_3px_#0000001F]",
        className
      )}
    >
      <div className="w-full">
        <div>
          <h2 className="mb-2 text-xl font-extrabold text-gray-900 md:text-[32px]">
            Enter card details
          </h2>
        </div>
        <Formik
          initialValues={{
            cvc: "",
            exp_month: "",
            exp_year: "",
            nameOnCard: "",
            number: "",
          }}
          onSubmit={handleCardDetailsSubmit}
          validationSchema={CardFormValidationSchema}
        >
          {({
            handleChange,
            values,
            handleBlur,
            touched,
            errors,
            isSubmitting,
          }) => (
            <Form className="mt-10 space-y-5">
              <div className="grid grid-cols-1">
                {options.map(({ className: cName, name, ...item }) => (
                  <fieldset key={name} className={cName}>
                    <Input
                      required
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values[name]}
                      isError={!!(touched[name] && errors[name])}
                      hint={touched[name] && errors[name] ? errors[name] : ""}
                      {...item}
                      id={name}
                      hintClass={cn("text-xs")}
                    />
                  </fieldset>
                ))}
              </div>
              <StripeCardElement
                label="Enter Card Details"
                id="XXX"
                hintClass="text-xs"
                onChange={setCompleted}
              />
              <div>
                <Button
                  loading={isSubmitting}
                  type="submit"
                  className="max-w-full md:max-w-full"
                >
                  Pay
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="hidden h-60 w-full max-w-[200px] md:block">
        <Image
          src={cardImage}
          alt="mask"
          className=" h-60 w-auto object-contain"
        />
      </div>
    </div>
  );
};

export default PaymentCardDetails;
