export const imagesToBase64 = (imageFiles) => {
  if (!Array.isArray(imageFiles)) {
    return Promise.reject(new Error("Input must be an array of File objects."));
  }

  const promises = imageFiles.map((imageFile) => {
    return new Promise((resolve, reject) => {
      // Check if it is a File object and an image.
      if (!imageFile || !(imageFile instanceof File)) {
        reject(new Error("Array must contain only File objects."));
        return;
      }

      if (!imageFile.type.startsWith("image/")) {
        reject(new Error("File is not an image."));
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(reader.error);
      };

      reader.readAsDataURL(imageFile);
    });
  });

  return Promise.all(promises);
};

