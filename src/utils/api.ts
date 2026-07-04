export function getPositivePage(searchParams: URLSearchParams) {
  const page = Number(searchParams.get("page") || 1);
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
}

export function optionalParam(searchParams: URLSearchParams, key: string) {
  const value = searchParams.get(key)?.trim();
  return value || undefined;
}
