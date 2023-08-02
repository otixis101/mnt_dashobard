import Link from "next/link";
import Button from "@/components/atoms/Button";
import Image from "next/image";
import mask from "../../../../public/assets/Mask group.png";

interface PaymentProps {
  btnText: string;
  subscribeText: string;
}

type Props = PaymentProps;

const Payment = ({ btnText, subscribeText }: Props) => (
  <div className="flex items-center justify-center">
    <div className="relative h-[408px] w-[80vw] rounded-3xl bg-[#5724EB] sm:h-[308px] md:h-[335px] lg:w-[75vw]">
      <div>
        <h3 className="mx-auto pt-[37px] text-center text-[32px] font-extrabold leading-[34px] text-[white] md:pt-[66px] lg:w-[836px] lg:text-5xl">
          Upgrade to the premium plan
        </h3>
      </div>
      <div>
        <p className="mx-auto w-[271px] pt-[31px] text-center text-sm font-normal text-[white] sm:min-w-[371px] md:w-[554px] md:pt-[20px] md:text-2xl md:leading-9 lg:w-[754px]">
          You are currently on the free plan. Please Upgrade to enjoy all
          premium features.{" "}
          <Link href="/" className="underline">
            Learn More
          </Link>
        </p>
      </div>
      <div className="mx-auto mb-[58px] mt-6 flex flex-wrap items-center justify-center md:mb-11 md:mt-7 md:flex-nowrap">
        <div>
          <Button href="/auth/payment/cardpayment" className="md:p-0">
            <div
              className="w-full rounded-md p-0.5"
              style={{
                backgroundImage:
                  "linear-gradient(84.27deg, #9F7DFF 9.07%, #620B63 42.92%, #684f36 69.04%, #E4601F 101.92%)",
              }}
            >
              <div className="back flex h-full w-full items-center justify-center rounded-md bg-white">
                <h1
                  className="bg-clip-text p-[15px_33px_15px_33px] text-sm text-transparent md:p-[12px_41px_12px_41px] md:text-lg"
                  style={{
                    backgroundImage:
                      "linear-gradient(84.27deg, #9F7DFF 9.07%, #620B63 42.92%, #684f36 69.04%, #E4601F 101.92%)",
                  }}
                >
                  {subscribeText}
                </h1>
              </div>
            </div>
          </Button>
        </div>
        <div className="md:ml-12">
          <Button href="/" intent="whiteOutline">
            {btnText}
          </Button>
        </div>
      </div>
      <div>
        <Image
          src={mask}
          alt="mask"
          className="insert-y-0 absolute bottom-0 right-0 h-[130px] w-[441px] rounded-3xl lg:h-[100%] lg:w-[85%]"
        />
      </div>
    </div>
  </div>
);

export default Payment;
