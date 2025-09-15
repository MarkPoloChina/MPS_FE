function getAListFileUrl(file?: string, base?: string) {
  if (!file) return null;
  return `${import.meta.env.VITE_BASE_BLOGS_URL}${base ? `${base.split("/").slice(0, -1).join("/")}/` : ""}${file
    .split("/")
    .map((s) => {
      return s.includes("%") ? s : encodeURIComponent(s);
    })
    .join("/")}`;
}

export { getAListFileUrl };
