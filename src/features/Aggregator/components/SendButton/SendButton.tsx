import React from "react";
import styles from "../../AggregatorPage.module.css";

interface SendButtonProps {
  disabled: boolean;
  active: boolean;
  onClick: () => void;
}

export const SendButton: React.FC<SendButtonProps> = ({
  disabled,
  active,
  onClick,
}) => (
  <button
    className={`
      ${styles.sendBtn}
      ${active ? styles.sendBtnActive : styles.sendBtnInactive}
    `}
    onClick={onClick}
    disabled={disabled}
  >
    Отправить
  </button>
);
