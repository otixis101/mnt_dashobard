// import { StripeProvider } from "@/base/hooks/api/stripePayment";
import PaymentCardDetails from "./PaymentCardDetails";
import PaymentToggleCard from "./PaymentToggleCard";

const PaymentCard = () => (
  <div>
    <div className="flex flex-col items-center justify-center lg:flex-row">
      <div>
        <PaymentToggleCard />
      </div>
      <div>
        {/* <StripeProvider> */}
        <PaymentCardDetails onSubmit={() => {}} />
        {/* </StripeProvider> */}
      </div>
    </div>
  </div>
);

export default PaymentCard;
