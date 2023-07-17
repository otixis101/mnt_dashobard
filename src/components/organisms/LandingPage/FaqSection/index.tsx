import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/molecules/Accordion";
import { AboutSectionHeading } from "@/components/atoms/About/Primitives";
import faqs from "./faqData";

const FaqSection = () => (
  <section id="faqs" className="container mx-auto my-28 max-sm:px-4 md:py-10">
    <div className="flex flex-col gap-6 md:items-center md:justify-center md:gap-8 lg:flex-row lg:gap-16">
      <div className="w-full space-y-5 text-center lg:max-w-md lg:text-left">
        <AboutSectionHeading className="max-lg:mx-auto">
          Frequently Asked Questions and Answers
        </AboutSectionHeading>
        <p className="text-slate-900 md:text-lg">
          Get answers to pressing questions from users just like you.
        </p>
      </div>
      <div className="h-max w-full max-w-[750px] overflow-hidden rounded-lg border md:min-w-[500px]">
        <Accordion defaultValue="one" className="" type="single" collapsible>
          {faqs.map(({ id, qst, ans }) => (
            <AccordionItem className="" key={id} value={id}>
              <AccordionTrigger className="w-full px-4 text-start text-slate-800 data-[state=open]:bg-midpup md:px-10">
                {qst}
              </AccordionTrigger>
              <AccordionContent className="break-words px-4 text-gray-500 md:px-10">
                {ans}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FaqSection;
