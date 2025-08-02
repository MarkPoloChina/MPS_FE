function getAListFileUrl(file?: string) {
  if (!file) return null;
  return `${import.meta.env.VITE_BASE_BLOGS_URL}${file.split("/").map(encodeURIComponent).join("/")}`;
}

export { getAListFileUrl };
