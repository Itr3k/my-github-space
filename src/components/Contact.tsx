import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export const Contact = () => {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    try {
      const { data, error } = await supabase.functions.invoke('submit-contact', {
        body: {
          ...values,
          source: 'contact',
        },
      });

      if (error) throw error;

      toast.success(data.message || "Message sent successfully!");
      form.reset();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error(error.message || "Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Elevated AI | Request an AI Readiness Conversation</title>
        <meta name="description" content="Contact Elevated AI to discuss your AI risk, opportunity, and readiness. Request a conversation with our enterprise AI consultants." />
        <meta name="keywords" content="Contact Elevated AI, AI consulting contact, enterprise AI services, AI transformation inquiry" />
        <link rel="canonical" href="https://elevatedai.co/contact" />
        
        <meta property="og:title" content="Contact Elevated AI" />
        <meta property="og:description" content="Request an AI Readiness Conversation with Elevated AI." />
        <meta property="og:url" content="https://elevatedai.co/contact" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact Elevated AI" />
        <meta name="twitter:description" content="Request an AI Readiness Conversation with Elevated AI." />
      </Helmet>
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Request a Conversation</h1>
            <p className="text-zinc-400 text-lg mb-12">
                Ready to discuss your AI risk and opportunity? Reach out to us directly or use the form below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-white/5 border border-white/10">
                            <Mail className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-1">Email</h3>
                            <p className="text-zinc-400">Korra@Elevatedai.co</p>
                            <p className="text-zinc-400">Johnathan@Elevatedai.co</p>
                        </div>
                    </div>

                     <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-white/5 border border-white/10">
                            <MapPin className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-1">Mailing Address</h3>
                            <p className="text-zinc-400">P.O. Box 14762</p>
                            <p className="text-zinc-400">Torrance, CA 90503</p>
                        </div>
                    </div>

                     <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-white/5 border border-white/10">
                            <Phone className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-1">Phone</h3>
                            <p className="text-zinc-400">+1 (424) 484-3844</p>
                            <p className="text-zinc-500 text-xs mt-1">Mon-Fri, 9am-5pm PST</p>
                        </div>
                    </div>

                    {/* Voice AI Callout */}
                    <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
                      <p className="text-zinc-400 text-sm mb-2">Prefer to talk it through?</p>
                      <a 
                        href="tel:+14244843844" 
                        className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors text-sm"
                      >
                        Call our AI assistant—available 24/7—to see if a conversation makes sense →
                      </a>
                    </div>
                </div>

                <div className="bg-[#0F0F13] border border-white/10 p-8 rounded-3xl">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your name"
                                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Email</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder="your@email.com"
                                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Message</FormLabel>
                              <FormControl>
                                <Textarea 
                                  rows={4}
                                  placeholder="Tell us about your AI challenges and goals..."
                                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="submit" 
                          className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200"
                          disabled={form.formState.isSubmitting}
                        >
                          {form.formState.isSubmitting ? "Sending..." : "Request a Conversation"}
                        </Button>
                      </form>
                    </Form>
                </div>
            </div>

        </motion.div>
      </div>
    </div>
    </>
  );
};
