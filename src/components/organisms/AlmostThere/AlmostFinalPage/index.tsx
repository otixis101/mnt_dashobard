import FinalForm from "@/components/molecules/AlmostThere/AlmostThereForms/FinalForm";
import AlmostThereHeader from "@/components/molecules/AlmostThere/AlmostThereHeader";

const AlmostFinalPage = () => (
  <section className="container">
    <div className="w-full space-y-5 max-md:py-10 max-md:pb-20 md:space-y-7">
      <AlmostThereHeader level={3} />
      <div className="mx-auto max-w-[95%] md:max-w-6xl">
        <FinalForm />
      </div>
    </div>
  </section>
);

export default AlmostFinalPage;
