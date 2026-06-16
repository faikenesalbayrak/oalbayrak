import { DRON_QUESTIONS, type DronSubmission } from "@shared/dron";
import { Download, Eye, Home, Lock, LogOut, RefreshCw, X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import "./dron-form.css";

const SESSION_KEY = "dron_admin_session";
const SESSION_TTL_MS = 60 * 60 * 1000;

type AdminSession = {
  password: string;
  expiresAt: number;
};

export default function DronAdmin() {
  const [password, setPassword] = useState("");
  const [session, setSession] = useState<AdminSession | null>(() => readSession());
  const [submissions, setSubmissions] = useState<DronSubmission[]>([]);
  const [selected, setSelected] = useState<DronSubmission | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSessionVerified, setIsSessionVerified] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authHeader = useMemo(() => (session ? `Bearer ${session.password}` : ""), [session]);

  useEffect(() => {
    if (session) {
      void fetchSubmissions(authHeader);
    }
  }, [authHeader, session]);

  async function login() {
    const trimmed = password.trim();
    if (!trimmed) {
      setError("Lütfen admin şifresini giriniz.");
      return;
    }

    setError(null);
    setIsLoggingIn(true);

    try {
      const nextSubmissions = await requestSubmissions(`Bearer ${trimmed}`);
      const nextSession = {
        password: trimmed,
        expiresAt: Date.now() + SESSION_TTL_MS,
      };

      setSubmissions(nextSubmissions);
      setIsSessionVerified(true);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
      setSession(nextSession);
      setPassword("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Sunucuyla bağlantı kurulamadı.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setSession(null);
    setSubmissions([]);
    setSelected(null);
    setIsSessionVerified(false);
  }

  async function fetchSubmissions(header = authHeader) {
    setIsLoading(true);
    setError(null);

    try {
      setSubmissions(await requestSubmissions(header));
      setIsSessionVerified(true);
    } catch (caught) {
      if (caught instanceof AdminAuthError) {
        logout();
        setIsSessionVerified(false);
      }
      setError(caught instanceof Error ? caught.message : "Sunucuyla bağlantı kurulamadı.");
    } finally {
      setIsLoading(false);
    }
  }

  async function exportExcel() {
    setIsExporting(true);
    setError(null);

    try {
      const response = await fetch("/api/dron/submissions/export", {
        headers: { Authorization: authHeader },
      });

      if (response.status === 401) {
        logout();
        throw new Error("Admin şifresi hatalı veya oturum süresi doldu.");
      }

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(result?.message || "Excel dosyası oluşturulamadı.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `dron_basvurular_${new Date().toISOString().slice(0, 10)}.xlsx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Excel dosyası indirilemedi.");
    } finally {
      setIsExporting(false);
    }
  }

  if (!session) {
    return (
      <DronAdminShell>
        <section className="dron-card dron-login-card" aria-labelledby="admin-login-title">
          <div className="dron-login-icon">
            <Lock size={30} />
          </div>
          <h1 id="admin-login-title">Admin Paneli</h1>
          <p>Başvuruları görüntülemek için admin şifresini giriniz.</p>
          <form
            className="dron-login-form"
            onSubmit={(event) => {
              event.preventDefault();
              void login();
            }}
          >
            <label className="dron-field">
              <span>Admin şifresi</span>
              <input
                autoComplete="current-password"
                autoFocus
                type="password"
                value={password}
                disabled={isLoggingIn}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            {error ? <div className="dron-alert">{error}</div> : null}
            <button className="dron-btn dron-btn-primary" type="submit" disabled={isLoggingIn}>
              {isLoggingIn ? "Kontrol ediliyor..." : "Giriş Yap"}
            </button>
          </form>
        </section>
      </DronAdminShell>
    );
  }

  if (!isSessionVerified) {
    return (
      <DronAdminShell onLogout={logout}>
        <section className="dron-card dron-login-card" aria-live="polite">
          <div className="dron-login-icon">
            <Lock size={30} />
          </div>
          <h1>Oturum Kontrol Ediliyor</h1>
          <p>Admin oturumu doğrulanıyor...</p>
        </section>
      </DronAdminShell>
    );
  }

  return (
    <DronAdminShell onLogout={logout}>
      <section className="dron-admin-panel">
        <div className="dron-admin-titlebar">
          <div>
            <h1>Gelen Müşteri Başvuruları</h1>
            <p>Sistemde kayıtlı tüm başvuruları listeleyebilir, inceleyebilir ve Excel çıktısı alabilirsiniz.</p>
          </div>
          <div className="dron-admin-actions">
            <button className="dron-btn dron-btn-secondary" type="button" disabled={isLoading} onClick={() => void fetchSubmissions()}>
              <RefreshCw size={17} />
              Yenile
            </button>
            <button className="dron-btn dron-btn-primary" type="button" disabled={isExporting} onClick={() => void exportExcel()}>
              <Download size={17} />
              {isExporting ? "Hazırlanıyor..." : "Excel İndir"}
            </button>
          </div>
        </div>

        {error ? <div className="dron-alert">{error}</div> : null}

        <div className="dron-table-wrap">
          <table className="dron-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tarih</th>
                <th>Ad-Soyad</th>
                <th>Şirket Adı</th>
                <th>Hedef Ülke</th>
                <th>Okul Adı</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7}>Yükleniyor...</td>
                </tr>
              ) : submissions.length === 0 ? (
                <tr>
                  <td colSpan={7}>Kayıt bulunamadı.</td>
                </tr>
              ) : (
                submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td>#{submission.id}</td>
                    <td>{formatDate(submission.created_at)}</td>
                    <td>{submission.q1 || "-"}</td>
                    <td>{submission.q4 || "-"}</td>
                    <td>{submission.q16 || "-"}</td>
                    <td>{submission.q2 || "-"}</td>
                    <td>
                      <button className="dron-icon-btn" type="button" onClick={() => setSelected(submission)} aria-label={`#${submission.id} detaylarını gör`}>
                        <Eye size={16} />
                        Detay
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selected ? <SubmissionModal submission={selected} onClose={() => setSelected(null)} /> : null}
    </DronAdminShell>
  );
}

function DronAdminShell({ children, onLogout }: { children: ReactNode; onLogout?: () => void }) {
  return (
    <div className="dron-page dron-admin-page">
      <header className="dron-header">
        <div className="dron-logo" aria-label="AERO-NW Yönetim">
          <span className="dron-logo-icon">A</span>
          <span>AERO-NW YÖNETİM</span>
        </div>
        <div className="dron-header-actions">
          <a className="dron-header-link" href="/form">
            <Home size={16} />
            Form Sayfası
          </a>
          {onLogout ? (
            <button className="dron-header-link dron-header-button" type="button" onClick={onLogout}>
              <LogOut size={16} />
              Çıkış
            </button>
          ) : null}
        </div>
      </header>
      <main className="dron-main">{children}</main>
      <footer className="dron-footer">&copy; 2026 AERO-NW Aerospace & Defense. Tüm hakları saklıdır.</footer>
    </div>
  );
}

function SubmissionModal({ submission, onClose }: { submission: DronSubmission; onClose: () => void }) {
  return (
    <div className="dron-modal" role="dialog" aria-modal="true" aria-labelledby="submission-modal-title" onMouseDown={onClose}>
      <div className="dron-modal-content" onMouseDown={(event) => event.stopPropagation()}>
        <div className="dron-modal-header">
          <h2 id="submission-modal-title">Başvuru Detayı (#{submission.id})</h2>
          <button className="dron-modal-close" type="button" onClick={onClose} aria-label="Detay penceresini kapat">
            <X size={22} />
          </button>
        </div>
        <div className="dron-detail-list">
          {DRON_QUESTIONS.map((question, index) => {
            const key = `q${index + 1}` as keyof DronSubmission;
            const answer = String(submission[key] || "Belirtilmemiş");

            return (
              <div className="dron-detail-row" key={question}>
                <div className="dron-detail-label">
                  {index + 1}. Soru: {question}
                </div>
                <div className="dron-detail-value">{answer}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

class AdminAuthError extends Error {
  constructor() {
    super("Admin şifresi hatalı veya oturum süresi doldu.");
  }
}

async function requestSubmissions(header: string) {
  const response = await fetch("/api/dron/submissions", {
    headers: { Authorization: header },
  });
  const result = (await response.json().catch(() => null)) as {
    success?: boolean;
    basvurular?: DronSubmission[];
    message?: string;
  } | null;

  if (response.status === 401) {
    throw new AdminAuthError();
  }

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Başvurular alınamadı.");
  }

  return result.basvurular ?? [];
}

function readSession(): AdminSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;

    const session = JSON.parse(raw) as AdminSession;
    if (!session.password || session.expiresAt <= Date.now()) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }

    return session;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString("tr-TR", {
      dateStyle: "short",
      timeStyle: "medium",
      timeZone: "Europe/Istanbul",
    });
  } catch {
    return value;
  }
}
