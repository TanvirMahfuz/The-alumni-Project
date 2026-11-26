// File storage isn't set up yet, so uploads are off unless explicitly enabled.
// Set VITE_FILE_UPLOADS_ENABLED=true (and FILE_UPLOADS_ENABLED=true on the
// backend) once storage is available.
export const FILE_UPLOADS_ENABLED =
  import.meta.env.VITE_FILE_UPLOADS_ENABLED === "true";

export const UPLOADS_DISABLED_MESSAGE = "File upload is not available yet";
