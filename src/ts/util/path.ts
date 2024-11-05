function getAListFileUrl(file?: string) {
  if (!file) return null;
  return `${import.meta.env.VITE_BASE_IHS_URL}/${encodeURIComponent(file)}`;
}

export { getAListFileUrl };
