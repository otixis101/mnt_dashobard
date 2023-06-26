import Image, { StaticImageData } from "next/image";

interface Props {
  text: string;
  image: string | StaticImageData;
  name: string;
  jobRole: string;
}

const TestimonialCard = (props: Props) => {
  const { image, name, jobRole, text } = props;
  return (
    <div className="flex flex-col flex-wrap items-center gap-10 gap-y-4 rounded-lg bg-midpup p-5 sm:flex-row sm:p-8">
      <div className="flex w-full max-w-fit items-center gap-4">
        <Image className="h-16 w-16 rounded-full" src={image} alt={name} />
        <div>
          <h5 className="w-full max-w-fit whitespace-nowrap font-extrabold text-gray-900">
            {name}
          </h5>
          <p className="text-sm text-gray-500">{jobRole}</p>
        </div>
      </div>
      <q className="text-gray-700">{text}</q>
    </div>
  );
};

export default TestimonialCard;
