import { useState, useMemo, useRef } from "react";
import { Send, Paperclip, X, Loader2 } from "lucide-react";
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
  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<LocalFile[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [hp, setHp] = useState(""); // honeypot

  const inputRef = useRef<HTMLInputElement | null>(null);

  // file helpers
  const filesInfo = useMemo(
    () =>
      files.map((f) => ({
        name: f.name,
        sizeMB: (f.size / (1024 * 1024)).toFixed(2),
        type: f.type || "application/octet-stream",
      })),
    [files]
  );

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    for (const f of Array.from(list)) {
      if (next.length >= MAX_FILES) break;
      const tooBig = f.size > MAX_MB * 1024 * 1024;
      const badType = !ALLOWED.includes(f.type || "");
      if (tooBig) {
        setError(`“${f.name}” exceeds ${MAX_MB} MB.`);
        continue;
      }
      if (badType) {
        setError(`File type not allowed: ${f.name}. Use PDF, DOC/DOCX, JPG or PNG.`);
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

  // submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Honeypot: if filled, silently succeed (anti-bot)
    if (hp.trim()) {
      setSuccess("Your enquiry has been sent.");
      resetForm();
      return;
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please complete name, email and message.");
      return;
    }
    if (files.length > MAX_FILES) {
      setError(`Maximum ${MAX_FILES} files allowed.`);
      return;
    }

    setSending(true);
    try {
      const converted = await Promise.all(
        files.map(async (f) => ({
          name: f.name,
          type: f.type || "application/octet-stream",
          data: await fileToBase64(f), // base64 sin prefijo
        }))
      );

      const ok = await sendProjectEnquiry({
        name,
        email,
        message,
        files: converted,
      });

      if (ok) {
        setSuccess("Your enquiry has been sent.");
        resetForm();
        setTimeout(() => setSuccess(null), 6000);
      } else {
        setError("Could not send. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Unexpected error while sending.");
    } finally {
      setSending(false);
    }
  }

  function resetForm() {
    setName("");
    setEmail("");
    setMessage("");
    setFiles([]);
  }

  return (
    <section className="relative">
      {/* Layout a dos columnas como en tu referencia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

        {/* PANEL IZQUIERDO — NEGRO (Contact Information) */}
        <aside className="bg-black/90 text-white p-8 md:p-10 rounded-2xl shadow-2xl backdrop-blur-md space-y-6">
          <h2 className="text-3xl font-light tracking-tight">
            Contact<br/>Information
          </h2>

          {/* Office */}
          <div>
            <p className="text-[10px] tracking-[0.4em] text-gray-400 uppercase">Office</p>
            <p className="mt-2 leading-relaxed text-gray-200">
              108 Kestrel Road, Corby,<br />
              Northamptonshire, England
            </p>
          </div>

          {/* Telephone */}
          <div>
            <p className="text-[10px] tracking-[0.4em] text-gray-400 uppercase">Telephone</p>
            <p className="mt-2 text-gray-200">+44 07955018937</p>
          </div>

          {/* Email */}
          <div>
            <p className="text-[10px] tracking-[0.4em] text-gray-400 uppercase">Email</p>
            <p className="mt-2 text-red-400">db@dbsdesigner.com</p>
          </div>
        </aside>

        {/* PANEL DERECHO — FORM (glass gris translúcido) */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-10 rounded-2xl shadow-2xl text-white space-y-8"
        >
          {/* Honeypot */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            className="hidden"
            aria-hidden="true"
          />

          {/* FULL NAME / EMAIL ADDRESS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="uppercase text-[10px] tracking-[0.35em] text-white/80">
                Full name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full mt-2 bg-white/10 border border-white/20 px-4 py-3 rounded-lg placeholder-white/60 text-white outline-none focus:border-white/50"
                required
              />
            </div>
            <div>
              <label className="uppercase text-[10px] tracking-[0.35em] text-white/80">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full mt-2 bg-white/10 border border-white/20 px-4 py-3 rounded-lg placeholder-white/60 text-white outline-none focus:border-white/50"
                required
              />
            </div>
          </div>

          {/* PROJECT BRIEF */}
          <div>
            <label className="uppercase text-[10px] tracking-[0.35em] text-white/80">
              Project brief
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your architectural vision..."
              rows={5}
              className="w-full mt-2 bg-white/10 border border-white/20 px-4 py-3 rounded-lg placeholder-white/60 text-white outline-none focus:border-white/50"
              required
            />
          </div>

          {/* ATTACHMENTS */}
          <div>
            <label className="uppercase text-[10px] tracking-[0.35em] text-white/80">
              Attachments
            </label>

            <div
              onDragOver={onDragOver}
              onDrop={onDrop}
              className="mt-3 rounded-xl border border-dashed border-white/30 bg-white/5 p-8 text-center cursor-pointer hover:bg-white/10 transition"
              onClick={() => inputRef.current?.click()}
            >
              <Paperclip className="mx-auto mb-2 opacity-70" />
              <p className="text-sm text-white/80">
                Click to attach blueprints, photos, or project requirements
              </p>
              <p className="text-[11px] text-white/50 mt-2">
                Max {MAX_FILES} files — Types: PDF, DOC/DOCX, JPG, PNG — ≤ {MAX_MB} MB each
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
              <div className="mt-4 space-y-2">
                {filesInfo.map((f, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-white/10 border border-white/15 p-3 rounded-lg"
                  >
                    <span className="text-sm text-white/90">
                      {f.name} • {f.sizeMB} MB
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="text-red-300 hover:text-red-200"
                      aria-label={`Remove ${f.name}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FEEDBACK */}
          {error && (
            <div className="text-red-200 bg-red-900/30 border border-red-500/40 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="text-emerald-200 bg-emerald-900/30 border border-emerald-500/40 px-4 py-2 rounded-lg text-sm">
              {success}
            </div>
          )}

