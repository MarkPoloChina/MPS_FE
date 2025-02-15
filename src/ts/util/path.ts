function getAListFileUrl(file?: string) {
  if (!file) return null;
  return `${import.meta.env.VITE_BASE_BLOGS_URL}/${encodeURIComponent(file)}`;
}

export { getAListFileUrl };
