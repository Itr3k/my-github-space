
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const FAQS = [
  {
    question: "What does Elevated AI do?",
    answer: "We provide comprehensive enterprise AI solutions, from strategic consulting and roadmap planning to the implementation of custom voice AI systems and workflow automation."
  },
  {
    question: "Who is behind Elevated AI?",
    answer: "Elevated AI is led by industry veterans with over 20 years of enterprise IT leadership experience, including work with Fortune 500 companies in the media and entertainment sectors."
  },
  {
    question: "What types of AI solutions do you build?",
    answer: "We specialize in Voice AI for customer support, internal workflow automation using intelligent agents, and custom computer vision solutions for quality control and spatial analysis."
  },
  {
    question: "Do you work with small businesses?",
    answer: "While our expertise is in enterprise-scale implementation, we offer scalable solutions that can benefit growing mid-market businesses looking to leverage AI for competitive advantage."
  },
  {
    question: "How long does implementation take?",
    answer: "Timelines vary by project scope. A typical strategy roadmap takes 2-4 weeks, while a full custom voice AI deployment might take 6-12 weeks depending on integration complexity."
  }
];

export const FAQ = () => {
  return (
    <section className="py-24 px-6 bg-[#0A0A0F]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-zinc-400">Common questions about AI automation and our services</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-white/10 bg-white/5 rounded-lg px-6 overflow-hidden">
              <AccordionTrigger className="text-white hover:text-indigo-400 hover:no-underline py-6 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400 pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
