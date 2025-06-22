import React from "react";
import CloseIcon from "../../assets/icons/Close.svg";
import styles from "./CloseButton.module.css";

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

export const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  className = "",
  ariaLabel = "Закрыть",
}) => (
  <button
    className={`${styles.closeBtn} ${className}`}
    onClick={onClick}
    aria-label={ariaLabel}
  >
    <img src={CloseIcon} alt="" className={styles.closeIcon} />
  </button>
);
