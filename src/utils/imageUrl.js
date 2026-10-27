/**
 * Helper to ensure uploaded images (/uploads/...) are fetched with the proper backend host.
 * Supports both local development (http://localhost:5000) and deployed production environments.
 */
export const getImageUrl = (path) => {
  if (!path) return "/men1.png";

  // If already absolute URL or data URL
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }

  // If path starts with /uploads/
  if (path.startsWith("/uploads/")) {
    const isLocal =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1");

    if (isLocal) {
      return `http://localhost:5000${path}`;
    }

    const backendUrl = import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "")
      : "https://next-trend-backend.onrender.com";

    return `${backendUrl}${path}`;
  }

  // Other local public assets (like /men1.png, /logo.png)
  return path;
};

export default getImageUrl;
