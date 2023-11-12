import AboutProfileForm from "@/components/molecules/UpdateProfile/AboutProfileForm";

interface Props {
  onPrevClick(): void;
  // onNextClick?(): void;
}
const AboutPage = ({ onPrevClick }: Props) => (
  <div className="mx-auto max-w-[90%] sm:max-w-full md:max-w-2xl">
    <AboutProfileForm
      onPrevClick={onPrevClick}
    />
  </div>
);

export default AboutPage;
