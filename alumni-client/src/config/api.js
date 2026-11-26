const isDevelopment = import.meta.env.VITE_ENVIRONMENT === "development";

// REST API base, including the /api/v1 prefix
export const API_BASE_URL = isDevelopment
  ? import.meta.env.VITE_DEVELOPMENT_URL
  : import.meta.env.VITE_DEPLOYMENT_URL;

// Socket.IO server origin (no /api/v1 — socket.io doesn't work with sub-paths).
// Override with VITE_SOCKET_URL; defaults keep the previous behaviour.
export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  (isDevelopment
    ? "http://localhost:3000"
    : "https://the-alumni-project.onrender.com");

// Read an error message from a failed response, falling back to a default
export const readError = async (res, fallback) => {
  try {
    const body = await res.json();
    return body?.message || body?.error || fallback;
  } catch {
    return fallback;
  }
};
