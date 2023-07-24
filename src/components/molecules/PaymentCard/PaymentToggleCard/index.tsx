import Image from "next/image";
import ToggleBtn from "@/components/atoms/ToggleBtn";
import Link from "next/link";
import starImage from "../../../../../public/assets/Star 3.png";

const PaymentToggleCard = () => (
  <div className="h-[252px] w-[71vw] rounded-t-3xl bg-[#323232] md:h-[330px] md:w-[45vw] md:pl-[31px] md:pr-[25px] lg:h-[408px] lg:w-[25vw] lg:rounded-l-3xl">
    <div className="flex items-center justify-center pt-[52px]">
      <div>
        <p className="text-sm font-medium text-[#E2DAFC]">Pay monthly</p>
      </div>
      <div className="ml-4">
        <ToggleBtn
          state={false}
          wrapperClass="bg-[#979797]  w-[47px] h-[23px] md:w-[45px] md:h-[22px] rounded-[19px]"
        />
      </div>
      <div className="ml-4">
        <div>
          <p className="text-sm font-medium text-[#E2DAFC]">Pay yearly</p>
        </div>
        <div>
          <p className="text-[8px] font-normal text-[white] md:text-[10px] md:font-medium">
            Save up to 20%
          </p>
        </div>
      </div>
    </div>
    <div>
      <div>
        <p className="mt-[15px] text-center text-xl font-extrabold text-[white] md:mt-[63px] md:text-[32px]">
          Premium
        </p>
      </div>
      <div className="mx-auto mt-1.5 flex items-center justify-center text-center md:mt-4">
        <div>
          <Image
            src={starImage}
            alt="mask"
            className="h-[36px] w-[36px] lg:h-[51px] lg:w-[51px]"
          />
        </div>
        <div>
          <p className="pl-3 text-3xl font-extrabold text-[#E2DAFC] md:text-5xl">
            $15/mo
          </p>
        </div>
      </div>
    </div>
    <div className="mx-auto mt-[15px] w-[173px] text-center text-[11px] font-normal text-[#E2DAFC] underline md:mt-[25px] md:w-[139px] lg:mt-[86px]">
      <Link href="/">Learn more about premium features</Link>
    </div>
  </div>
);

export default PaymentToggleCard;
