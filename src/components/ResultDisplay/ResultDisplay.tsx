import type { AggregationResult } from "../../types";
import styles from "./ResultDisplay.module.css";

interface ResultDisplayProps {
  data: AggregationResult;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ data }) => {
  return (
    <div className={styles.resultContainer}>
      <div className={styles.grid}>
        <div className={styles.item}>
          <span className={styles.value}>
            {(data.total_spend_galactic ?? 0).toLocaleString()}
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
          <span className={styles.value}>{data.big_spent_at ?? 0}</span>
          <span className={styles.label}>
            день года с максимальными расходами
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>{data.less_spent_at ?? 0}</span>
          <span className={styles.label}>
            день года с минимальными расходами
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>
            {(data.big_spent_value ?? 0).toLocaleString()}
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
