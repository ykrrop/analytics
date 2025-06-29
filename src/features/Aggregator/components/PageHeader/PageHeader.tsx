import React from "react";
import styles from "../../AggregatorPage.module.css";

export const PageHeader: React.FC = () => (
  <p className={styles.title}>
    Загрузите <strong>csv</strong> файл и получите{" "}
    <strong>полную информацию</strong> о нём за сверхнизкое время
  </p>
);
