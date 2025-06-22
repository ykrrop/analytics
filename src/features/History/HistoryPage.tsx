import React, { useState } from "react";
import { useHistoryStore } from "../../store/historyStore";
import styles from "./HistoryPage.module.css";
import { Modal } from "../../components/Modal/Modal";
import type { HistoryEntry } from "../../types";
import { useNavigate } from "react-router-dom";
import { HistoryEntryItem } from "../../components/HistoryEntryItem/HistoryEntryItem";
import { ResultModalContent } from "../../components/ResultModalContent/ResultModalContent";

export const HistoryPage: React.FC = () => {
  const { history, removeFromHistory, clearHistory } = useHistoryStore();
  const [selected, setSelected] = useState<HistoryEntry | null>(null);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {history.map((entry) => (
          <HistoryEntryItem
            key={entry.id}
            entry={entry}
            onSelect={setSelected}
            onDelete={removeFromHistory}
          />
        ))}
      </ul>

      <div className={styles.bottomActions}>
        <button
          className={styles.generateMoreButton}
          onClick={() => navigate("/generator")}
        >
          Сгенерировать больше
        </button>

        {history.length > 0 && (
          <button className={styles.clearAllButton} onClick={clearHistory}>
            Очистить всё
          </button>
        )}
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <ResultModalContent entry={selected} />
        </Modal>
      )}
    </div>
  );
};
