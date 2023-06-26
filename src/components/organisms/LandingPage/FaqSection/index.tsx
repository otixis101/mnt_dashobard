import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/molecules/Accordion";
import faqs from "./faqData";

const FaqSection = () => (
  <section className="container mx-auto py-20 max-sm:px-4">
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-16">
      <div className="space-y-3 text-center md:w-2/4 md:text-left">
        <h2 className="text-3xl font-bold text-primary md:text-5xl">
          Frequently Asked Questions and Answers
        </h2>
        <p className="text-slate-900 md:text-lg">
          Get answers to pressing questions from users just like you.
        </p>
      </div>
      <div className="h-max w-full overflow-hidden rounded-lg border">
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
