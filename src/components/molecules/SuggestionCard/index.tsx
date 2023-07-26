import Button from "@/components/atoms/Button";
import Image from "next/image";
import Placeholder from "public/assets/Family_Bg.jpeg";

interface Props {
  addedBy: {
    name: string;
    /** accepts an absolute url */
    image?: string;
  };
  /** accepts an absolute url */
  profileImage?: string;
  name: string;
  state: string;
  onAccept?(): void;
  onReject?(): void;
}

const SuggestionCard = (props: Props) => {
  const {
    addedBy: { image: aImage, name: aName },
    name,
    profileImage,
    state,
    onAccept,
    onReject,
  } = props;

  return (
    <div className="w-full max-w-xs max-sm:mx-auto sm:max-w-lg">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="relative h-52 w-full overflow-hidden rounded-lg md:w-52">
          <Image
            className="object-cover"
            /** using fill, image would be fetched from a server vs static images */
            fill
            src={profileImage ?? Placeholder}
            alt={name}
          />
        </div>
        <div className="w-full max-w-xs">
          <div className="mb-6 text-center sm:text-left">
            <h4 className="text-3xl font-extrabold leading-tight text-primary">
              {name}
            </h4>
            <p className="text-black">{state}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-primary sm:text-base">
              Added By
            </span>
            <div className="flex w-full items-center gap-2 rounded-lg bg-midpup p-2 text-custom-black">
              <div className="relative h-12 w-12 overflow-hidden rounded-md">
                <Image
                  fill
                  src={aImage ?? Placeholder}
                  alt={aName}
                  className="object-cover"
                />
              </div>
              <h5 className="font-medium sm:text-lg">{aName}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 px-6">
        <Button onClick={onAccept} intent="outline">
          Yes
        </Button>
        <Button onClick={onReject} intent="outline">
          No
        </Button>
      </div>
    </div>
  );
};

export default SuggestionCard;
