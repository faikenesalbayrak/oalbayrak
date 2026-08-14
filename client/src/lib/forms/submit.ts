export type SubmitResult =
  | { success: true }
  | { success: false; status: number };

export async function postForm(
  _url: string,
  payload: Record<string, unknown>
): Promise<SubmitResult> {
  try {
    const response = await fetch("https://formsubmit.co/ajax/orhan.albayrak@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        "Ad Soyad": payload.fullName,
        "E-posta": payload.email,
        "Konu": payload.subject,
        "Mesaj": payload.message,
        "_subject": `[orhanalbayrak.com] Yeni İletişim Mesajı: ${payload.subject || "Genel"}`,
        "_replyto": payload.email,
        "_template": "table",
      }),
    });

    const data = (await response.json().catch(() => null)) as {
      success?: boolean | string;
    } | null;

    const isSuccess =
      response.ok &&
      (data?.success === true || data?.success === "true" || response.status === 200);

    return isSuccess
      ? { success: true }
      : { success: false, status: response.status };
  } catch {
    return { success: false, status: 0 };
  }
}

