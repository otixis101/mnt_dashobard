import Image, { StaticImageData } from "next/image";
import Button from "../Button";

interface Props {
  name: string;
  icon: string | StaticImageData;
  onClick: () => void;
  loading?: boolean;
}

const CustomAuthButton = (props: Props) => {
  const { name, icon, onClick, loading } = props;
  return (
    <Button
      onClick={onClick}
      loading={loading}
      className="flex max-w-full items-center justify-center border-gray-400/80 text-sm text-black hover:border-primary md:max-w-full md:text-sm"
      intent="outline"
    >
      <Image src={icon} alt="" />
      <span>{name}</span>
    </Button>
  );
};

export default CustomAuthButton;
