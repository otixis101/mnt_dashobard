import SuccessModal from "../../SuccessModal";

const PaymentSuccess = () => (
  <div>
    <div className="flex items-center justify-center min-h-app md:min-h-[calc(100vh-180px)]">
      <div className="w-full">
        <SuccessModal
          btnText="Continue to family tree"
          text="Payment successful "
          href="/"
        />
      </div>
    </div>
  </div>
);

export default PaymentSuccess;
