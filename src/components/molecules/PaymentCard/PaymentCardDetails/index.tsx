import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Image from "next/image";
import { Formik, Form, ErrorMessage } from "formik";
import { CardFormValidationSchema } from "@/base/helpers/FormValidationSchemas";
import cardImage from "../../../../../public/assets/card img.png";
// import useStripeService from "@/base/hooks/api/stripePayment";

const PaymentCardDetails = () => {
  // const stripeService = useStripeService();

  const handleCardDetailsSubmit = async (values: string | number) => {
    console.log("submitted", values);
  };

  return (
    <div className="flex w-[84vw] items-center justify-center rounded-3xl pl-[38px] pr-[36px] pt-[31px] shadow-[0px_0px_8px_3px_#0000001F] md:h-[581px] md:w-[58vw] md:pl-[8px] md:pr-[0px] md:pt-[0px] lg:w-[47vw] lg:pl-[45px]">
      <div>
        <div>
          <h2 className="mb-2 text-xl font-extrabold text-gray-900 md:text-[32px]">
            Enter card details
          </h2>
        </div>
        <Formik
          initialValues={{
            nameOnCard: "",
            cardNumber: "",
            expireDate: "",
            cvv: "",
          }}
          onSubmit={handleCardDetailsSubmit}
          validationSchema={CardFormValidationSchema}
        >
          {({ handleChange, values, handleBlur }) => (
            <Form className="mt-4 flex flex-col gap-4 space-y-1">
              <fieldset>
                <Input
                  required
                  name="nameOnCard"
                  type="text"
                  label="Name on card"
                  placeholder="Enter name on card"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nameOnCard}
                />
                <ErrorMessage
                  name="nameOnCard"
                  component="div"
                  className="error"
                />
              </fieldset>
              <fieldset>
                <Input
                  required
                  name="cardNumber"
                  type="number"
                  label="Card number"
                  placeholder="0000 0000 0000 0000"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cardNumber}
                />
                <ErrorMessage
                  name="cardNumber"
                  component="div"
                  className="error"
                />
              </fieldset>
              <div className="flex justify-between">
                <div className="mr-14">
                  <fieldset>
                    <Input
                      required
                      name="expireDate"
                      type="number"
                      label="Expire Date"
                      placeholder="DD/MM"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.expireDate}
                    />
                    <ErrorMessage
                      name="expireDate"
                      component="div"
                      className="error"
                    />
                  </fieldset>
                </div>
                <div>
                  <fieldset>
                    <Input
                      required
                      name="cvv"
                      type="number"
                      label="CVV"
                      placeholder="***"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.cvv}
                    />
                    <ErrorMessage
                      name="cvv"
                      component="div"
                      className="error"
                    />
                  </fieldset>
                </div>
              </div>
              <div className="pb-[40px] pt-[20px] md:pb-[0px] md:pt-[20px] lg:pt-[27px]">
                <Button
                  type="submit"
                  className="max-w-full md:max-w-full"
                  // disabled={isSubmitting}
                >
                  Pay
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <Image
          src={cardImage}
          alt="mask"
          className="hidden lg:block lg:h-[205px] lg:w-[280px]"
        />
      </div>
    </div>
  );
};

export default PaymentCardDetails;
