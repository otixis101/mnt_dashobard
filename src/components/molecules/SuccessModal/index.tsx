import Button from "@/components/atoms/Button";
import Image from "next/image";
import SuccessIcon from "~/success.png";

interface AsLink {
  href: string;
  onAccept?: never;
}

interface AsButton {
  href?: never;
  onAccept(): void;
}

interface DefaultProps {
  text: string;
  btnText: string;
}

type Props = DefaultProps & (AsButton | AsLink);

/** Pass href to render a link or anAccept to render a button
 * @example
 * ```tsx
 * <SuccessModal {...props} href="/random-url" /> // would render an anchor tag
 * <SuccessModal {...props} onClick={()=> console.log("...")} /> // would render a button tag
 * ```
 */
const SuccessModal = ({ onAccept, text, btnText, href }: Props) => (
  <div className="px-3">
    <div className="mx-auto grid min-h-[550px] w-full max-w-md place-items-center md:rounded-lg md:border-2 md:gradient-borders--v1 ">
      <div className="grid w-full place-items-center gap-6 px-3 text-center">
        <Image className="mx-auto" src={SuccessIcon} alt="Success" />
        <h4 className="font-medium md:text-lg">{text}</h4>
        {href ? (
          <Button href={href} intent="outline">
            {btnText}
          </Button>
        ) : (
          <Button onClick={onAccept} intent="outline">
            {btnText}
          </Button>
        )}
      </div>
    </div>
  </div>
);

export default SuccessModal;
