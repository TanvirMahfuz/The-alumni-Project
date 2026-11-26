import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import TabEmpty from "../TabEmpty/TabEmpty.jsx";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PDFViewer({ pdfUrl }) {
  if (!pdfUrl) {
    return <TabEmpty title="Resume" message="No resume uploaded yet." />;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      Temporarily Unavailable
    </div>
  );
}

export default PDFViewer;
