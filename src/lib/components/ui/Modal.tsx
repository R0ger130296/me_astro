import React, { useEffect, useRef } from 'react';
import { Icon } from './Icon';
import { useBodyScrollLock } from '../../composables/useBodyScrollLock';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  maxWidth?: string;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  maxWidth = 'max-w-3xl',
  closeOnBackdropClick = true,
  closeOnEscape = true,
  children,
}) => {
  const modalElement = useRef<HTMLDivElement>(null);
  const backdropElement = useRef<HTMLDivElement>(null);
  const { lock, unlock } = useBodyScrollLock();

  const handleClose = React.useCallback(() => {
    unlock();
    onClose();
  }, [unlock, onClose]);

  const handleKeydown = React.useCallback((event: KeyboardEvent) => {
    if (closeOnEscape && event.key === 'Escape' && isOpen) {
      event.preventDefault();
      event.stopPropagation();
      handleClose();
    }
  }, [closeOnEscape, isOpen]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && event.target === backdropElement.current) {
      handleClose();
    }
  };

  const handleBackdropKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      lock();
      // Focus on modal after animation
      const timeoutId = setTimeout(() => {
        modalElement.current?.focus();
      }, 150);
      return () => {
        clearTimeout(timeoutId);
        unlock();
      };
    } else {
      unlock();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const handleKeydownWrapper = (event: KeyboardEvent) => {
        if (closeOnEscape && event.key === 'Escape' && isOpen) {
          event.preventDefault();
          event.stopPropagation();
          handleClose();
        }
      };
      window.addEventListener('keydown', handleKeydownWrapper);
      return () => {
        window.removeEventListener('keydown', handleKeydownWrapper);
      };
    }
  }, [isOpen, closeOnEscape, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={backdropElement}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-primary-900/60 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeydown}
      role="button"
      tabIndex={0}
      aria-label="Close modal"
    >
      <div
        ref={modalElement}
        className={`relative ${maxWidth} w-full max-h-[90vh] bg-white rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden focus:outline-none border border-primary-100 animate-slide-up`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 sm:p-6 lg:p-8 border-b border-primary-100 bg-gradient-to-r from-primary-50/80 to-white">
          <div className="flex-1 pr-4 min-w-0">
            <h3 id="modal-title" className="text-lg sm:text-xl lg:text-2xl font-semibold text-primary-800 mb-1 truncate">
              {title}
            </h3>
            {subtitle && <p className="text-sm sm:text-base text-primary-500 truncate">{subtitle}</p>}
          </div>
          <button
            onClick={handleClose}
            className="shrink-0 w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-white hover:bg-primary-50 active:bg-primary-100 flex items-center justify-center transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-offset-2 border border-primary-200"
            aria-label="Close modal"
            type="button"
          >
            <Icon name="X" size={18} color="#64748b" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(90vh-120px)] scrollbar-thin">
          {children}
        </div>
      </div>
    </div>
  );
};

