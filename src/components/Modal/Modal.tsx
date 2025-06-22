import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import CloseIcon from "../../assets/icons/Close.svg";

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
        <button className={styles.close} onClick={onClose} aria-label="Закрыть">
          <img src={CloseIcon} alt="" className={styles.closeIcon} />
        </button>
        {children}
      </div>
    </div>,
    el
  );
};
