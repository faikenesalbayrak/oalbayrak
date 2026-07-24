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

const FIELD_CLASS =
  "border-gray-200 bg-white placeholder:text-gray-400 focus-visible:border-[#1e3a5f] focus-visible:ring-[#1e3a5f]/20";

export function ContactForm() {
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
      toast.success("Mesajınız iletildi. Teşekkürler!");
      form.reset();
      return;
    }
    toast.error(
      result.status === 429
        ? "Çok fazla deneme yapıldı. Lütfen biraz sonra tekrar deneyin."
        : "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin."
    );
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <div>
          <h3 className="text-2xl font-semibold text-[#1e3a5f]">Bize yazın</h3>
          <p className="mt-1 text-sm leading-relaxed text-gray-500">
            Akademik iş birliği, konuşmacı daveti veya genel sorularınız için
            formu doldurabilirsiniz.
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
                <FormLabel>Ad Soyad</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="name"
                    placeholder="Ad Soyad"
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
                <FormLabel>E-posta</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="ornek@eposta.com"
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
              <FormLabel>Konu</FormLabel>
              <FormControl>
                <Input
                  placeholder="Mesajınızın konusu"
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
              <FormLabel>Mesaj</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Mesajınızı buraya yazın…"
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
                <FormLabel className="text-sm font-normal leading-relaxed text-gray-500">
                  Kişisel verilerimin bu talebi yanıtlamak amacıyla işlenmesini
                  kabul ediyorum.
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
          {submitting ? "Gönderiliyor…" : "Mesajı Gönder"}
        </button>
      </form>
    </Form>
  );
}
