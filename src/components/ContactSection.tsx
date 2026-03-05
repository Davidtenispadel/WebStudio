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
          // fileToBase64 debe devolver la parte base64 sin prefijo
          data: await fileToBase64(f),
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
        // ocultar mensaje tras unos segundos
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

  const formDisabled =
    sending || !name.trim() || !isValidEmail(email) || !message.trim();

  return (
    <section id="contacto" className="w-full bg-neutral-100">
      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* Cabecera */}
        <div className="mb-10">
          <h2
            className="text-3xl font-bold tracking-tight text-neutral-900"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Solicita tu presupuesto
          </h2>
          <p
            className="mt-2 text-neutral-600"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Cuéntanos tu proyecto (BIM / Arquitectura). Respuesta en &lt; 24 h.
          </p>
        </div>

        {/* Tarjeta */}
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_0_#d4d4d8]">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2"
            noValidate
          >
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
              <label
                htmlFor="name"
                className="text-sm font-semibold text-neutral-800"
