import React, { useEffect, useRef, useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const [isMouseDownOnOverlay, setIsMouseDownOnOverlay] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      // Focus the modal when opened
      modalRef.current?.focus();
      // Lock background scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll when closed
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayMouseDown = (e) => {
    // Only set true if clicking directly on overlay (not children)
    if (e.target === overlayRef.current) {
      setIsMouseDownOnOverlay(true);
    }
  };

  const handleOverlayMouseUp = (e) => {
    // Only close if mouse down AND up were on the overlay
    if (isMouseDownOnOverlay && e.target === overlayRef.current) {
      onClose();
    }
    setIsMouseDownOnOverlay(false);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex justify-center items-center bg-white/90 backdrop-blur-sm "
      onMouseDown={handleOverlayMouseDown}
      onMouseUp={handleOverlayMouseUp}
      style={{ pointerEvents: isOpen ? "auto" : "none" }} // Ensure overlay is clickable only when open
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800  rounded-xl w-full max-w-xl shadow-xl outline-none overflow-auto"
        tabIndex={-1}
        // Prevent focus from interfering with click detection
        onMouseDown={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
