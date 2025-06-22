import React from "react";
import styles from "./ResultDisplay.module.css";

interface StatItemProps {
  label: string;
  formatted: string;
}

export const StatItem: React.FC<StatItemProps> = ({ label, formatted }) => (
  <div className={styles.item}>
    <span className={styles.value}>{formatted}</span>
    <span className={styles.label}>{label}</span>
  </div>
);
