import React from "react";
import styles from "./DoneButton.module.css";

interface DoneButtonProps {
  onClick?: () => void;
}

export const DoneButton: React.FC<DoneButtonProps> = ({ onClick }) => (
  <button className={styles.doneBtn} onClick={onClick}>
    Done!
  </button>
);
