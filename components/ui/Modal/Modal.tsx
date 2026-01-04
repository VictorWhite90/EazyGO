'use client';

/**
 * Modal Component
 * Professional modal dialog with glassmorphism backdrop
 */

import { forwardRef, HTMLAttributes, ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { modalBackdrop, modalContent } from '@/lib/animations/variants';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the modal is open
   */
  open: boolean;

  /**
   * Callback when modal should close
   */
  onClose: () => void;

  /**
   * Modal title
   */
  title?: string;

  /**
   * Modal content
   */
  children: ReactNode;

  /**
   * Hide close button
   */
  hideCloseButton?: boolean;

  /**
   * Custom modal width
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  /**
   * Close on backdrop click
   * @default true
   */
  closeOnBackdropClick?: boolean;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      title,
      children,
      hideCloseButton = false,
      maxWidth = 'md',
      closeOnBackdropClick = true,
      className,
      ...props
    },
    ref
  ) => {
    // Max width styles
    const maxWidthStyles = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
    };

    // Lock body scroll when modal is open
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }

      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [open]);

    // Handle escape key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && open) {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, onClose]);

    return (
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              variants={modalBackdrop}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 glass-modal-backdrop"
              onClick={closeOnBackdropClick ? onClose : undefined}
            />

            {/* Modal content */}
            <motion.div
              ref={ref}
              variants={modalContent}
              initial="initial"
              animate="animate"
              exit="exit"
              className={cn(
                'relative w-full bg-white rounded-2xl shadow-2xl overflow-hidden',
                maxWidthStyles[maxWidth],
                className
              )}
              onClick={(e) => e.stopPropagation()}
              {...props}
            >
              {/* Header */}
              {(title || !hideCloseButton) && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
                  {title && (
                    <h2 className="text-xl font-semibold text-neutral-900">
                      {title}
                    </h2>
                  )}
                  {!hideCloseButton && (
                    <button
                      onClick={onClose}
                      className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
                      aria-label="Close modal"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              )}

              {/* Body */}
              <div className="px-6 py-4">
                {children}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;
