import React from "react";
import CloseIcon from "../../assets/icons/Close.svg";
import styles from "./CloseButton.module.css";

interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => (
  <button className={styles.closeBtn} onClick={onClick} aria-label="Закрыть">
    <img src={CloseIcon} alt="" className={styles.closeIcon} />
  </button>
);
