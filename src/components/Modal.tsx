import React, { useEffect, useRef } from 'react';
import FocusLock from 'react-focus-lock';
import { X } from 'lucide-react';
import { useFocusManagement } from '../hooks/useFocusManagement';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className = '' }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { saveFocus, restoreFocus } = useFocusManagement();

  useEffect(() => {
    if (isOpen) {
      saveFocus();
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, saveFocus]);

  useEffect(() => {
    if (!isOpen) {
      restoreFocus();
    }
  }, [isOpen, restoreFocus]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <FocusLock>
        <div
          ref={modalRef}
          className={`relative bg-surface-primary rounded-lg shadow-xl max-w-md w-full mx-4 max-h-screen overflow-y-auto transition-colors duration-theme ${className}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border-primary">
            <h2 id="modal-title" className="text-xl font-semibold text-text-primary">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-text-tertiary hover:text-text-secondary hover:bg-surface-secondary rounded-full transition-colors duration-theme focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">{children}</div>
        </div>
      </FocusLock>
    </div>
  );
};

export default Modal;