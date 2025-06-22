import styles from "./SendButton.module.css";

interface SendButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const SendButton: React.FC<SendButtonProps> = ({
  onClick,
  disabled,
}) => (
  <button onClick={onClick} disabled={disabled} className={styles.sendButton}>
    Отправить
  </button>
);
