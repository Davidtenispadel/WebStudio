
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

  function validateEmail(val: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  function pickFiles() {
    inputRef.current?.click();
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    for (const f of Array.from(list)) {
      if (next.length >= MAX_FILES) break;
      const tooBig = f.size > MAX_MB * 1024 * 1024;
      const badType = !ALLOWED.includes(f.type || "");
      if (!tooBig && !badType) next.push(f);
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

    if (!name.trim() || !validateEmail(email) || !message.trim()) {
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
          data: await fileToBase64(f), // base64 (sin prefijo)
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
      } else {
        setError("No se pudo enviar. Inténtalo de nuevo.");
      }
    } catch (err: any) {
      setError(err?.message || "Fallo inesperado al enviar.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contacto" className="w-full bg-neutral-100">
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Cabecera */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900" style={{ fontFamily: "Arial, sans-serif" }}>
            Solicita tu presupuesto
          </h2>
          <p className="mt-2 text-neutral-600" style={{ fontFamily: "Arial, sans-serif" }}>
            Cuéntanos tu proyecto (BIM / Arquitectura). Respuesta en &lt;24 h.
          </p>
        </div>

        {/* Tarjeta */}
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_0_#d4d4d8]">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
            {/* Nombre */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold text-neutral-800" style={{ fontFamily: "Arial, sans-serif" }}>
                Nombre / Empresa
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-11 rounded-lg border border-neutral-300 px-3 outline-none ring-blue-200 focus:border-blue-500 focus:ring-4"
                aria-invalid={!name.trim()}
                placeholder="Ej.: David Bonilla / DB+"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-neutral-800" style={{ fontFamily: "Arial, sans-serif" }}>
                Correo
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-lg border border-neutral-300 px-3 outline-none ring-blue-200 focus:border-blue-500 focus:ring-4"
                aria-invalid={!validateEmail(email)}
                placeholder="tucorreo@empresa.com"
              />
            </div>



            {/* Mensaje (ocupa 2 columnas) */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="message" className="text-sm font-semibold text-neutral-800" style={{ fontFamily: "Arial, sans-serif" }}>
                Mensaje
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                className="rounded-lg border border-neutral-300 px-3 py-2 outline-none ring-blue-200 focus:border-blue-500 focus:ring-4"
                placeholder="Breve descripción, plazos, archivos relevantes…"
              />
            </div>

            {/* Zona de archivos */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-neutral-800" style={{ fontFamily: "Arial, sans-serif" }}>
                Adjuntos (opcional)
              </label>

              <div
                onDrop={onDrop}
                onDragOver={onDragOver}
                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 px-4 py-8 text-center hover:bg-neutral-100"
                onClick={pickFiles}
                aria-label="Zona para arrastrar y soltar archivos"
              >
                <Paperclip className="h-6 w-6 text-neutral-500" />
                <p className="text-sm text-neutral-600" style={{ fontFamily: "Arial, sans-serif" }}>
                  Arrastra tus archivos aquí o <span className="font-semibold text-neutral-800 underline">haz clic para seleccionar</span>
                </p>
                <p className="text-xs text-neutral-500" style={{ fontFamily: "Arial, sans-serif" }}>
                  Tipos permitidos: PDF, DOCX, JPG, PNG • Máx {MAX_FILES} archivos • {MAX_MB} MB c/u


                </p>
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => addFiles(e.target.files)}
                />
              </div>

              {/* Lista de archivos */}
              {files.length > 0 && (
                <ul className="mt-2 space-y-2">
                  {filesInfo.map((f, i) => (
                    <li key={`${f.name}-${i}`} className="flex items-center justify-between rounded-md border border-neutral-200 bg-white px-3 py-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-neutral-800" title={f.name} style={{ fontFamily: "Arial, sans-serif" }}>
                          {f.name}
                        </p>
                        <p className="text-xs text-neutral-500" style={{ fontFamily: "Arial, sans-serif" }}>

                </p>
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => addFiles(e.target.files)}
                />
              </div>

              {/* Lista de archivos */}
              {files.length > 0 && (
                <ul className="mt-2 space-y-2">
                  {filesInfo.map((f, i) => (
                    <li key={`${f.name}-${i}`} className="flex items-center justify-between rounded-md border border-neutral-200 bg-white px-3 py-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-neutral-800" title={f.name} style={{ fontFamily: "Arial, sans-serif" }}>
                          {f.name}
                        </p>
                        <p className="text-xs text-neutral-500" style={{ fontFamily: "Arial, sans-serif" }}>
                          {f.sizeMB} MB · {f.type}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="rounded-md p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
                        aria-label={`Quitar ${f.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>



            {/* CTA */}
            <div className="flex items-end justify-end md:col-span-2">
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-xl border border-blue-700 bg-[#007aff] px-5 py-3 font-semibold text-white shadow-[0_6px_0_#1d4ed8] transition-transform active:translate-y-0.5 disabled:opacity-60"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enviando…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Enviar solicitud
                  </>
                )}
              </button>
            </div>

            {/* Mensajes */}
            {success && (
              <div role="status" className="md:col-span-2 flex items-start gap-2 rounded-lg border border-[#34c759] bg-[#eaffef] px-3 py-2 text-[#116128]">
                <CheckCircle2 className="mt-0.5 h-4 w-4" />
                <p className="text-sm" style={{ fontFamily: "Arial, sans-serif" }}>{success}</p>
              </div>
            )}
            {error && (
              <div role="alert" className="md:col-span-2 flex items-start gap-2 rounded-lg border border-red-500 bg-red-50 px-3 py-2 text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4" />
                <p className="text-sm" style={{ fontFamily: "Arial, sans-serif" }}>{error}</p>
              </div>
            )}
          </form>
        </div>

        {/* Nota */}
        <p className="mt-3 text-xs text-neutral-500" style={{ fontFamily: "Arial, sans-serif" }}>
          Al enviar aceptas el tratamiento de datos para responder a tu solicitud. No compartimos tu información con terceros.
        </p>
      </div>
    </section>
  );
}

