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
import {
  cvRequestSchema,
  type CVRequestPayload,
} from "@/lib/forms/cv-request-schema";
import { postForm } from "@/lib/forms/submit";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const FIELD_CLASS =
  "border-gray-200 bg-white placeholder:text-gray-400 focus-visible:border-[#7a2948] focus-visible:ring-[#7a2948]/20 dark:border-white/10 dark:bg-[#0f1825] dark:text-white dark:placeholder:text-gray-500";

export function CvRequestForm() {
  const { isEnglish } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<CVRequestPayload>({
    resolver: zodResolver(cvRequestSchema) as Resolver<CVRequestPayload>,
    defaultValues: {
      fullName: "",
      institution: "",
      email: "",
      phone: "",
      message: "",
      consent: false,
      website: "",
    },
  });

  const onSubmit = form.handleSubmit(async values => {
    setSubmitting(true);
    const result = await postForm("/api/cv-request", values);
    setSubmitting(false);
    if (result.success) {
      toast.success(
        isEnglish
          ? "Your CV request has been sent. Thank you!"
          : "CV talebiniz iletildi. Teşekkürler!"
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
          ? "The request could not be sent. Please try again later."
          : "Talep gönderilemedi. Lütfen daha sonra tekrar deneyin."
    );
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <div>
          <h3 className="text-2xl font-semibold text-[#7a2948] dark:text-[#d989a7]">
            {isEnglish ? "Request a CV" : "CV talep edin"}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {isEnglish
              ? "Leave your details to request an up-to-date academic CV on behalf of your institution."
              : "Kurumunuz adına güncel akademik CV talep etmek için bilgilerinizi bırakın."}
          </p>
        </div>

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="cv-website">Website</label>
              <input
                id="cv-website"
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
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isEnglish ? "Institution" : "Kurum"}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      isEnglish
                        ? "Institution / university name"
                        : "Kurum / üniversite adı"
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
        <div className="grid gap-5 sm:grid-cols-2">
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
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {isEnglish ? "Phone (optional)" : "Telefon (opsiyonel)"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    autoComplete="tel"
                    placeholder="05xx xxx xx xx"
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {isEnglish ? "Message (optional)" : "Mesaj (opsiyonel)"}
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder={
                    isEnglish
                      ? "Anything you would like to add about your request…"
                      : "Talebinizle ilgili eklemek istedikleriniz…"
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
                    className="mt-0.5 data-[state=checked]:border-[#7a2948] data-[state=checked]:bg-[#7a2948]"
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal leading-relaxed text-gray-500 dark:text-gray-400">
                  {isEnglish
                    ? "I consent to the processing of my personal data for the purpose of responding to my CV request."
                    : "Kişisel verilerimin CV talebimi yanıtlamak amacıyla işlenmesini kabul ediyorum."}
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 rounded-full bg-[#7a2948] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5d1e37] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <FileText size={16} aria-hidden="true" />
          )}
          {submitting
            ? isEnglish
              ? "Sending…"
              : "Gönderiliyor…"
            : isEnglish
              ? "Request CV"
              : "CV Talep Et"}
        </button>
      </form>
    </Form>
  );
}
