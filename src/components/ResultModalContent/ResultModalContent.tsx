import React from "react";
import styles from "./ResultModalContent.module.css";
import type { HistoryEntry } from "../../types";
import { formatDayOfYear } from "../../utils/format";

interface ResultModalContentProps {
  entry: HistoryEntry;
}

export const ResultModalContent: React.FC<ResultModalContentProps> = ({
  entry,
}) => {
  if (!entry.result) {
    return <p className={styles.noData}>Не удалось обработать файл</p>;
  }

  const data = entry.result;
  const items = [
    {
      value: Math.round(data.total_spend_galactic ?? 0).toLocaleString(),
      label: "общие расходы в галактических кредитах",
    },
    {
      value: (data.rows_affected ?? 0).toLocaleString(),
      label: "количество обработанных записей",
    },
    {
      value: formatDayOfYear(data.less_spent_at),
      label: "день года с минимальными расходами",
    },
    {
      value: formatDayOfYear(data.big_spent_at),
      label: "день года с максимальными расходами",
    },
    {
      value: data.less_spent_civ ?? "-",
      label: "цивилизация с минимальными расходами",
    },
    {
      value: Math.round(data.big_spent_value ?? 0).toLocaleString(),
      label: "максимальная сумма расходов за день",
    },
    {
      value: data.big_spent_civ ?? "-",
      label: "цивилизация с максимальными расходами",
    },
    {
      value: (data.average_spend_galactic ?? 0).toFixed(2),
      label: "средние расходы в галактических кредитах",
    },
  ];

  return (
    <div className={styles.modalContent}>
      <div className={styles.itemsContainer}>
        {items.map((item, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.value}>{item.value}</div>
            <div className={styles.label}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
