// File storage isn't set up yet, so uploads are off unless explicitly enabled.
// Set FILE_UPLOADS_ENABLED=true (and the CLOUDINARY_* vars) to turn them on.
export const uploadsEnabled = () => process.env.FILE_UPLOADS_ENABLED === "true";

export const UPLOADS_DISABLED_MESSAGE = "File upload is not available yet";

// A value is a new upload when the client sent file contents (a data: URI),
// as opposed to an existing hosted URL.
export const isFileData = (value) =>
  typeof value === "string" && value.trim().startsWith("data:");

export const rejectUpload = (res) =>
  res.status(503).json({
    success: false,
    message: UPLOADS_DISABLED_MESSAGE,
    error: UPLOADS_DISABLED_MESSAGE,
  });
