import { useState, useMemo, useRef } from "react";
import { Send, Paperclip, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { sendProjectEnquiry, fileToBase64 } from "../services/emailService";

type LocalFile = File;

const MAX_FILES = 5;
const MAX_MB = 10;
const ALLOWED = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<LocalFile[]>([]);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hp, setHp] = useState(""); // honeypot anti‑spam

  const inputRef = useRef<HTMLInputElement | null>(null);

  const filesInfo = useMemo(
    () =>
      files.map((f) => ({
        name: f.name,
        sizeMB: (f.size / (1024 * 1024)).toFixed(2),
        type: f.type || "application/octet-stream",
      })),
    [files]
  );

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  const pickFiles = () => inputRef.current?.click();

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];

    for (const f of Array.from(list)) {
      if (next.length >= MAX_FILES) break;

      const tooBig = f.size > MAX_MB * 1024 * 1024;
      const badType = !ALLOWED.includes(f.type || "");
      if (tooBig) {
        setError(`“${f.name}” excede ${MAX_MB} MB.`);
        continue;
      }
      if (badType) {
        setError(`Tipo no permitido: ${f.name}. Usa PDF, DOC/DOCX, JPG o PNG.`);
        continue;
      }
      next.push(f);
    }
    setFiles(next);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function removeFile(index: number) {
    const copy = [...files];
    copy.splice(index, 1);
    setFiles(copy);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Honeypot: si está relleno, aborta silenciosamente
    if (hp.trim()) {
      setSuccess("Solicitud enviada correctamente.");
      setName("");
      setEmail("");
      setMessage("");
      setFiles([]);
      return;
    }

    if (!name.trim() || !isValidEmail(email) || !message.trim()) {
      setError("Revisa nombre, email y mensaje.");
      return;
    }
    if (files.length > MAX_FILES) {
      setError(`Máximo ${MAX_FILES} archivos.`);
      return;
    }

    setSending(true);
    try {
      const converted = await Promise.all(
        files.map(async (f) => ({
          name: f.name,
          type: f.type || "application/octet-stream",
          data: await fileToBase64(f), // base64 limpio (sin prefijo)
        }))
      );

      const ok = await sendProjectEnquiry({
        name,
        email,
        message,
        files: converted,
      });

      if (ok) {
        setSuccess("Solicitud enviada correctamente.");
        setName("");
        setEmail("");
        setMessage("");
        setFiles([]);
        setTimeout(() => setSuccess(null), 6000);
      } else {
        setError("No se pudo enviar. Inténtalo de nuevo.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Fallo inesperado al enviar.");
    } finally {
      setSending(false);
    }
  }

  const formDisabled = sending || !name.trim() || !isValidEmail(email) || !message.trim();

  return (
    <section id="contacto" className="w-full bg-neutral-100">
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Cabecera */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900" style={{ fontFamily: "Arial, sans-serif" }}>
            Solicita tu presupuesto
          </h2>
          <p className="mt-2 text-neutral-600" style={{ fontFamily: "Arial, sans-serif" }}>
            Cuéntanos tu proyecto (BIM / Arquitectura). Respuesta en &lt; 24 h.
          </p>
        </div>

        {/* Tarjeta */}
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_0_#d4d4d8]">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2" noValidate>
            {/* Honeypot invisible */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              className="hidden"
              aria-hidden="true"
            />

            {/* Nombre */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold text-neutral-800">Nombre</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 outline-none focus:border-neutral-500"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-neutral-800">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 outline-none focus:border-neutral-500"
                required
              />
            </div>

            {/* Mensaje */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-semibold text-neutral-800">Mensaje</label>
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-neutral-900 outline-none focus:border-neutral-500"
                required
              />
            </div>

            {/* Adjuntos */}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-neutral-800">Adjuntar archivos</label>
              <div
                onDragOver={onDragOver}
                onDrop={onDrop}
                className="mt-2 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-neutral-700"
              >
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm hover:bg-neutral-50"
                >
                  <Paperclip className="h-4 w-4" />
                  Seleccionar archivos
                </button>
                <p className="text-xs text-neutral-500">
                  Máx. {MAX_FILES} archivos — Tipos: PDF, DOC/DOCX, JPG, PNG — ≤ {MAX_MB} MB c/u
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => addFiles(e.target.files)}
                  accept={ALLOWED.join(",")}
                />
              </div>

              {files.length > 0 && (
                <div className="mt-4 divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
                  {files.map((f, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <Paperclip className="h-4 w-4 text-neutral-500" />
                        <div className="text-sm">
                          <div className="font-medium text-neutral-800">{filesInfo[idx].name}</div>
                          <div className="text-neutral-500 text-xs">{filesInfo[idx].type} · {filesInfo[idx].sizeMB} MB</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="rounded-md p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
                        aria-label={`Eliminar ${filesInfo[idx].name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Feedback */}
            <div className="md:col-span-2 flex flex-col gap-2">
              {error && (
                <div className="inline-flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              {success && (
                <div className="inline-flex items-center gap-2 rounded-lg border border-green-300 bg-green-50 px-3 py-2 text-green-700">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm">{success}</span>
                </div>
              )}
            </div>

            {/* Enviar */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={formDisabled}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Enviando…
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Enviar solicitud
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
