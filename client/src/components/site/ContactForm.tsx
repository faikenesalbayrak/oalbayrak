import { Checkbox } from "@/components/ui/checkbox";
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
import { contactSchema, type ContactPayload } from "@/lib/forms/contact-schema";
import { postForm } from "@/lib/forms/submit";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const FIELD_CLASS =
  "border-gray-200 bg-white placeholder:text-gray-400 focus-visible:border-[#1e3a5f] focus-visible:ring-[#1e3a5f]/20 dark:border-white/10 dark:bg-[#0f1825] dark:text-white dark:placeholder:text-gray-500";

export function ContactForm() {
  const { isEnglish } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<ContactPayload>({
    resolver: zodResolver(contactSchema) as Resolver<ContactPayload>,
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
      consent: false,
      website: "",
    },
  });

  const onSubmit = form.handleSubmit(async values => {
    setSubmitting(true);
    const result = await postForm("/api/contact", values);
    setSubmitting(false);
    if (result.success) {
      toast.success(
        isEnglish
          ? "Your message has been sent. Thank you!"
          : "Mesajınız iletildi. Teşekkürler!"
      );
      form.reset();
      return;
    }
    toast.error(
      result.status === 429
        ? isEnglish
          ? "Too many attempts. Please try again shortly."
          : "Çok fazla deneme yapıldı. Lütfen biraz sonra tekrar deneyin."
        : isEnglish
          ? "The message could not be sent. Please try again later."
          : "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin."
    );
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <div>
          <h3 className="text-2xl font-semibold text-[#7a2948] dark:text-white" style={{ fontFamily: "'DM Serif Display', serif" }}>
            {isEnglish ? "Write to me" : "Bana yazın"}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {isEnglish
              ? "Use this form for academic collaboration, speaking invitations, or general enquiries."
              : "Akademik iş birliği, konuşmacı daveti veya genel sorularınız için formu doldurabilirsiniz."}
          </p>
        </div>

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                tabIndex={-1}
                autoComplete="off"
                {...field}
              />
            </div>
          )}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isEnglish ? "Full name" : "Ad Soyad"}</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="name"
                    placeholder={isEnglish ? "Full name" : "Ad Soyad"}
                    className={FIELD_CLASS}
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
                <FormLabel>{isEnglish ? "Email" : "E-posta"}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder={
                      isEnglish ? "name@example.com" : "ornek@eposta.com"
                    }
                    className={FIELD_CLASS}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isEnglish ? "Subject" : "Konu"}</FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    isEnglish ? "Subject of your message" : "Mesajınızın konusu"
                  }
                  className={FIELD_CLASS}
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
              <FormLabel>{isEnglish ? "Message" : "Mesaj"}</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder={
                    isEnglish
                      ? "Write your message here…"
                      : "Mesajınızı buraya yazın…"
                  }
                  className={FIELD_CLASS}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-start gap-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={value => field.onChange(value === true)}
                    className="mt-0.5 data-[state=checked]:border-[#1e3a5f] data-[state=checked]:bg-[#1e3a5f]"
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal leading-relaxed text-gray-500 dark:text-gray-400">
                  {isEnglish
                    ? "I consent to the processing of my personal data for the purpose of responding to this request."
                    : "Kişisel verilerimin bu talebi yanıtlamak amacıyla işlenmesini kabul ediyorum."}
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-full bg-[#1e3a5f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#142b49] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <Send size={16} aria-hidden="true" />
          )}
          {submitting
            ? isEnglish
              ? "Sending…"
              : "Gönderiliyor…"
            : isEnglish
              ? "Send Message"
              : "Mesajı Gönder"}
        </button>
      </form>
    </Form>
  );
}
