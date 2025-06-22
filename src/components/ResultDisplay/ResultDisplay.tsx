import React from "react";
import type { AggregationResult } from "../../types";
import { formatDayOfYear } from "../../utils/format";

import styles from "./ResultDisplay.module.css";
import { StatItem } from "./StatItem";

type StatsValue = number | string | undefined;

interface StatsEntry {
  label: string;
  value: StatsValue;
  formatter: (v: StatsValue) => string;
}

interface ResultDisplayProps {
  data: AggregationResult;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ data }) => {
  const stats: StatsEntry[] = [
    {
      label: "общие расходы в галактических кредитах",
      value: data.total_spend_galactic,
      formatter: (v) => Math.round((v as number) ?? 0).toLocaleString("ru-RU"),
    },
    {
      label: "цивилизация с минимальными расходами",
      value: data.less_spent_civ,
      formatter: (v) => String(v ?? "-"),
    },
    {
      label: "количество обработанных записей",
      value: data.rows_affected,
      formatter: (v) => ((v as number) ?? 0).toLocaleString("ru-RU"),
    },
    {
      label: "день года с максимальными расходами",
      value: data.big_spent_at,
      formatter: (v) => formatDayOfYear(v as number),
    },
    {
      label: "день года с минимальными расходами",
      value: data.less_spent_at,
      formatter: (v) => formatDayOfYear(v as number),
    },
    {
      label: "максимальная сумма расходов за день",
      value: data.big_spent_value,
      formatter: (v) => Math.round((v as number) ?? 0).toLocaleString("ru-RU"),
    },
    {
      label: "цивилизация с максимальными расходами",
      value: data.big_spent_civ,
      formatter: (v) => String(v ?? "-"),
    },
    {
      label: "средние расходы в галактических кредитах",
      value: data.average_spend_galactic,
      formatter: (v) => {
        const num = typeof v === "number" ? v : 0;
        return num.toLocaleString("ru-RU", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      },
    },
  ];

  return (
    <div className={styles.resultContainer}>
      <div className={styles.grid}>
        {stats.map(({ label, value, formatter }, idx) => (
          <StatItem key={idx} label={label} formatted={formatter(value)} />
        ))}
      </div>
    </div>
  );
};
