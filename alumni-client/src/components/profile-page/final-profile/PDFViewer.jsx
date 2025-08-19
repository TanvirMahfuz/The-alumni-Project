import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PDFViewer({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);

  if (!pdfUrl) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        ❌ No PDF found
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      Temporarily Unavailable 
    </div>
  );
}

export default PDFViewer;
