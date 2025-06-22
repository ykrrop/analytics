import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { CloseButton } from "../CloseButton/CloseButton";
import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const el = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    document.body.append(el);
    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <CloseButton
          onClick={onClose}
          className={styles.close}
          ariaLabel="Закрыть"
        />
        {children}
      </div>
    </div>,
    el
  );
};
