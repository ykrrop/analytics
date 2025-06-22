import React from "react";
import styles from "../AggregatorPage.module.css";
import { ResultDisplay } from "../../../components/ResultDisplay/ResultDisplay";
import type { AggregationResult } from "../../../types";

interface ResultSectionProps {
  showBlocks: boolean;
  result: AggregationResult | null;
}

export const ResultSection: React.FC<ResultSectionProps> = ({
  showBlocks,
  result,
}) => {
  if (!showBlocks) {
    return (
      <p className={styles.highlightsHint}>
        Здесь
        <br />
        появятся хайлайты
      </p>
    );
  }

  return result ? <ResultDisplay data={result} /> : null;
};
