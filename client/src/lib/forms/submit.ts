export type SubmitResult =
  | { success: true }
  | { success: false; status: number };

export async function postForm(
  url: string,
  payload: Record<string, unknown>
): Promise<SubmitResult> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json().catch(() => null)) as {
      success?: boolean;
    } | null;
    return response.ok && data?.success === true
      ? { success: true }
      : { success: false, status: response.status };
  } catch {
    return { success: false, status: 0 };
  }
}
