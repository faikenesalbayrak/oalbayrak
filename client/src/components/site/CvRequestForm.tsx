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

const FIELD_CLASS =
  "border-gray-200 bg-white placeholder:text-gray-400 focus-visible:border-[#7a2948] focus-visible:ring-[#7a2948]/20";

export function CvRequestForm() {
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
      toast.success("CV talebiniz iletildi. Teşekkürler!");
      form.reset();
      return;
    }
    toast.error(
      result.status === 429
        ? "Çok fazla deneme yapıldı. Lütfen biraz sonra tekrar deneyin."
        : "Talep gönderilemedi. Lütfen daha sonra tekrar deneyin."
    );
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        <div>
          <h3 className="text-2xl font-semibold text-[#7a2948]">
            CV talep edin
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-gray-500">
            Kurumunuz adına güncel akademik CV talep etmek için bilgilerinizi
            bırakın.
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
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kurum</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Kurum / üniversite adı"
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
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon (opsiyonel)</FormLabel>
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
              <FormLabel>Mesaj (opsiyonel)</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Talebinizle ilgili eklemek istedikleriniz…"
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
                <FormLabel className="text-sm font-normal leading-relaxed text-gray-500">
                  Kişisel verilerimin CV talebimi yanıtlamak amacıyla
                  işlenmesini kabul ediyorum.
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
          {submitting ? "Gönderiliyor…" : "CV Talep Et"}
        </button>
      </form>
    </Form>
  );
}
