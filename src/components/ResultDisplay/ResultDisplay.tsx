import type { AggregationResult } from "../../types";
import styles from "./ResultDisplay.module.css";

interface ResultDisplayProps {
  data: AggregationResult;
}

// Функция для форматирования дня года в "день месяца" с правильным склонением
const formatDayOfYear = (dayOfYear?: number): string => {
  if (!dayOfYear || dayOfYear <= 0 || dayOfYear > 365) return "-";

  const date = new Date(2023, 0); // 1 января 2023
  date.setDate(dayOfYear);

  const day = date.getDate();

  // Месяцы в родительном падеже (правильное склонение)
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const monthName = months[date.getMonth()];

  return `${day} ${monthName}`;
};

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ data }) => {
  return (
    <div className={styles.resultContainer}>
      <div className={styles.grid}>
        <div className={styles.item}>
          <span className={styles.value}>
            {Math.round(data.total_spend_galactic ?? 0).toLocaleString()}
          </span>
          <span className={styles.label}>
            общие расходы в галактических кредитах
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>{data.less_spent_civ ?? "-"}</span>
          <span className={styles.label}>
            цивилизация с минимальными расходами
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>
            {(data.rows_affected ?? 0).toLocaleString()}
          </span>
          <span className={styles.label}>количество обработанных записей</span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>
            {formatDayOfYear(data.big_spent_at)}
          </span>
          <span className={styles.label}>
            день года с максимальными расходами
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>
            {formatDayOfYear(data.less_spent_at)}
          </span>
          <span className={styles.label}>
            день года с минимальными расходами
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>
            {Math.round(data.big_spent_value ?? 0).toLocaleString()}
          </span>
          <span className={styles.label}>
            максимальная сумма расходов за день
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>{data.big_spent_civ ?? "-"}</span>
          <span className={styles.label}>
            цивилизация с максимальными расходами
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>
            {(data.average_spend_galactic ?? 0).toFixed(2)}
          </span>
          <span className={styles.label}>
            средние расходы в галактических кредитах
          </span>
        </div>
      </div>
    </div>
  );
};
