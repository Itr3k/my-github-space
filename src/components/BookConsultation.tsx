import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Twitter, Linkedin, Github, Youtube } from 'lucide-react';
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

const consultationFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  company: z.string().max(100).optional(),
  areaOfInterest: z.string().max(100).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export const BookConsultation = () => {
  const form = useForm<z.infer<typeof consultationFormSchema>>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      areaOfInterest: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof consultationFormSchema>) => {
    try {
      const { data, error } = await supabase.functions.invoke('submit-contact', {
        body: {
          ...values,
          source: 'consultation',
        },
      });

      if (error) throw error;

      toast.success(data.message || "Consultation request sent successfully!");
      form.reset();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error(error.message || "Failed to send request. Please try again.");
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-medium mb-8">
               <Mail className="w-3 h-3" />
               Get in Touch
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Let's Build Something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">Extraordinary Together</span>
            </h1>
            
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Serving businesses across Los Angeles and Southern California. Whether you're ready to start a project or exploring AI strategy, we're here to help.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 md:p-10 rounded-3xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/10 relative overflow-hidden"
            >
               {/* Form Header */}
               <h3 className="text-2xl font-bold text-white mb-8">Send us a message</h3>
               
               <Form {...form}>
                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                   <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Full Name</FormLabel>
                         <FormControl>
                           <Input 
                             placeholder="John Doe"
                             className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-700"
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
                         <FormLabel className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Email</FormLabel>
                         <FormControl>
                           <Input 
                             type="email"
                             placeholder="john@company.com"
                             className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-700"
                             {...field} 
                           />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
                   
                   <FormField
                     control={form.control}
                     name="company"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Company (Optional)</FormLabel>
                         <FormControl>
                           <Input 
                             placeholder="Your Company"
                             className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-700"
                             {...field} 
                           />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />

                   <FormField
                     control={form.control}
                     name="areaOfInterest"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Area of Interest (Optional)</FormLabel>
                         <FormControl>
                           <Input 
                             placeholder="e.g., AI Strategy, Voice AI, Automation"
                             className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-700"
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
                         <FormLabel className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Message</FormLabel>
                         <FormControl>
                           <Textarea 
                             rows={5} 
                             placeholder="Tell us about your project..."
                             className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-700 resize-none"
                             {...field} 
                           />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
                   
                   <Button 
                     type="submit" 
                     className="w-full py-4 bg-white text-black rounded-full font-bold hover:bg-zinc-200 flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
                     disabled={form.formState.isSubmitting}
                   >
                     {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                     <Send className="w-4 h-4" />
                   </Button>

                   <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="w-4 h-4 mt-0.5 text-zinc-500">🔒</div>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        Your privacy matters. We will only use your contact information to respond to your inquiry. We never share your data with third parties.
                      </p>
                   </div>
                 </form>
               </Form>
            </motion.div>
          </div>

          {/* Right Column: Info Cards */}
          <div className="space-y-6">
            
            {/* Contact Info Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-3xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/10"
            >
               <h3 className="text-lg font-bold text-white mb-6">Contact Information</h3>
               <div className="space-y-6">
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                       <Mail className="w-4 h-4 text-zinc-300" />
                     </div>
                     <div>
                       <div className="text-xs text-zinc-500 font-medium mb-0.5">Email</div>
                       <a href="mailto:korra@elevatedai.co" className="text-sm text-white hover:text-indigo-400 transition-colors">korra@elevatedai.co</a>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                       <Phone className="w-4 h-4 text-zinc-300" />
                     </div>
                     <div>
                       <div className="text-xs text-zinc-500 font-medium mb-0.5">Phone</div>
                       <a href="tel:1-424-484-3844" className="text-sm text-white hover:text-indigo-400 transition-colors">1-424-484-3844</a>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                       <MapPin className="w-4 h-4 text-zinc-300" />
                     </div>
                     <div>
                       <div className="text-xs text-zinc-500 font-medium mb-0.5">Location</div>
                       <div className="text-sm text-white">Los Angeles, California</div>
                       <div className="text-xs text-zinc-500 mt-0.5">Serving Southern California</div>
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Office Hours Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-8 rounded-3xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/10"
            >
               <h3 className="text-lg font-bold text-white mb-6">Office Hours</h3>
               <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Monday - Friday</span>
                    <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Saturday</span>
                    <span className="text-white font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Sunday</span>
                    <span className="text-zinc-500 font-medium">Closed</span>
                  </div>
                  
                  <div className="pt-6 border-t border-white/5 mt-6 flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs text-zinc-300 font-medium">Currently available</span>
                  </div>
               </div>
            </motion.div>

            {/* Follow Us Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-8 rounded-3xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/10"
            >
               <h3 className="text-lg font-bold text-white mb-6">Follow Us</h3>
               <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all border border-white/5">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all border border-white/5">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all border border-white/5">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all border border-white/5">
                    <Youtube className="w-4 h-4" />
                  </a>
               </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};
