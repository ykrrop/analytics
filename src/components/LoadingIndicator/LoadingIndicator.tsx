import React from "react";
import styles from "./LoadingIndicator.module.css";

export const LoadingIndicator: React.FC = () => (
  <div className={styles.spinner} aria-label="loading-spinner" />
);
