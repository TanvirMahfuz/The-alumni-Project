export const pdfsToBase64 = (pdfFiles, maxSizeMB = 50) => {
  if (!Array.isArray(pdfFiles)) {
    return Promise.reject(new Error("Input must be an array of File objects."));
  }

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const promises = pdfFiles.map((pdfFile) => {
    return new Promise((resolve, reject) => {
      if (!pdfFile || !(pdfFile instanceof File)) {
        reject(new Error("Array must contain only File objects."));
        return;
      }

      if (pdfFile.type !== "application/pdf") {
        reject(new Error(`File '${pdfFile.name}' is not a PDF.`));
        return;
      }

      if (pdfFile.size > maxSizeBytes) {
        reject(
          new Error(`PDF '${pdfFile.name}' exceeds ${maxSizeMB}MB limit.`)
        );
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        resolve({
          name: pdfFile.name,
          size: pdfFile.size,
          type: pdfFile.type,
          lastModified: pdfFile.lastModified,
          base64: reader.result,
        });
      };

      reader.onerror = () => {
        reject(new Error(`Failed to read PDF '${pdfFile.name}'`));
      };

      reader.readAsDataURL(pdfFile);
    });
  });

  return Promise.all(promises);
};
