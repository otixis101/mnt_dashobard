import { ComponentProps, useState } from "react";
import { BsEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Input from "../Input";

type Props = ComponentProps<typeof Input>;

const PasswordInput = (props: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative flex justify-between w-full">
      <Input {...props} type={show ? "text" : "password"} />
      <button
        aria-label={show ? "Hide Password" : "Show Password"}
        type="button"
        onClick={() => setShow((c) => !c)}
        className=" right-3.5 top-1/2 translate-y-[calc(50%-5px)] text-[hsla(0,_0%,_20%,_1)]"
      >
        {show ? <BsFillEyeSlashFill size={20} /> : <BsEyeFill size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput;
