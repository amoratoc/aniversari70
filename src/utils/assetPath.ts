/**
 * Get the correct path for public assets, taking into account the base URL
 * This is needed for GitHub Pages deployment where base is '/aniversari70/'
 */
export function getAssetPath(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  // Remove leading slash from path if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
