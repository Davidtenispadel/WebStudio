// ----------------------------
// Modern Uploader (A2, stable)
// ----------------------------

const UPLOAD_ENDPOINT = "https://dbsdesigner.com/api/upload.php";

const uploadFiles = (files: File[]) => {
  if (!files?.length) return;
  setIsUploading(true);

  const initial: UploadedItem[] = files.map((f) => ({
    id: fileId(f),
    name: f.name,
    size: f.size,
    type: f.type,
    progress: 0,
    status: "uploading",
  }));

  setItems((prev) => [...prev, ...initial]);

  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  files.forEach((f) => formData.append("files[]", f));

  xhr.upload.onprogress = (e) => {
    if (!e.lengthComputable) return;
    const pct = Math.round((e.loaded / e.total) * 100);
    setItems((prev) =>
      prev.map((it) =>
        initial.some((i) => i.id === it.id)
          ? { ...it, progress: pct }
          : it
      )
    );
  };

  xhr.onload = () => {
    const ok = xhr.status >= 200 && xhr.status < 300;
    const raw = xhr.responseText || "";

    let json: any = null;
    try {
      json = JSON.parse(raw);
    } catch {
      json = null;
    }

    if (!ok || !Array.isArray(json)) {
      setItems((prev) =>
        prev.map((it) =>
          initial.some((i) => i.id === it.id)
            ? { ...it, status: "error", error: "Invalid server response" }
            : it
        )
      );
      setIsUploading(false);
      return;
    }

    const byName = new Map<string, { url?: string; error?: boolean }>();
    json.forEach((r: any) => {
      if (r && typeof r === "object" && typeof r.name === "string") {
        byName.set(r.name, { url: r.url, error: !!r.error });
      }
    });

    setItems((prev) =>
      prev.map((it) => {
        if (!initial.some((i) => i.id === it.id)) return it;
        const safe = it.name.replace(/[^A-Za-z0-9._-]/g, "_");
        const r = byName.get(safe);

        if (!r) {
          return { ...it, status: "error", error: "File missing" };
        }
        if (r.error) {
          return { ...it, status: "error", error: "Upload failed" };
        }
        return { ...it, status: "uploaded", progress: 100, url: r.url };
      })
    );

    setIsUploading(false);
  };

  xhr.onerror = () => {
    setItems((prev) =>
      prev.map((it) =>
        initial.some((i) => i.id === it.id)
          ? { ...it, status: "error", error: "Network error" }
          : it
      )
    );
    setIsUploading(false);
  };

  xhr.open("POST", UPLOAD_ENDPOINT, true);
  xhr.withCredentials = false;
  xhr.send(formData);
};

// Defensive drag-drop
const onDropFiles = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);
  const list = e.dataTransfer?.files;
  const files = list && list.length ? Array.from(list) : [];
  if (files.length) uploadFiles(files);
};

const onSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
  const list = e.target?.files;
  const files = list && list.length ? Array.from(list) : [];
  if (files.length) uploadFiles(files);
  if (e.currentTarget) e.currentTarget.value = "";
};
