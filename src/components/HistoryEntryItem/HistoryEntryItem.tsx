import React from "react";
import styles from "./HistoryEntryItem.module.css";
import type { HistoryEntry } from "../../types";
import Trash from "../../assets/icons/Trash.svg";
import File from "../../assets/icons/File.svg";
import Smile from "../../assets/icons/Smaile.svg";
import Sad from "../../assets/icons/Sad.svg";

interface HistoryEntryItemProps {
  entry: HistoryEntry;
  onSelect: (entry: HistoryEntry) => void;
  onDelete: (id: string) => void;
}

export const HistoryEntryItem: React.FC<HistoryEntryItemProps> = ({
  entry,
  onSelect,
  onDelete,
}) => {
  const isSuccess = !!entry.result;

  return (
    <li className={styles.entryContainer}>
      <div
        className={styles.entryBlock}
        onClick={() => isSuccess && onSelect(entry)}
      >
        <div className={styles.fileInfo}>
          <img src={File} alt="Файл" className={styles.fileIcon} />
          <span
            className={styles.fileName}
            style={{ color: isSuccess ? "#201B10" : "#8F64AE" }}
          >
            {entry.fileName}
          </span>
          <span
            className={styles.date}
            style={{ color: isSuccess ? "#201B10" : "#8F64AE" }}
          >
            {formatDate(entry.uploadDate)}
          </span>
        </div>
        <div className={styles.statusContainer}>
          <span
            className={styles.statusSuccess}
            style={{ color: isSuccess ? "#201B10" : "#8F64AE" }}
          >
            Обработан успешно
            <img src={Smile} alt="Улыбка" className={styles.statusIcon} />
          </span>
          <span
            className={styles.statusError}
            style={{ color: isSuccess ? "#8F64AE" : "#201B10" }}
          >
            Не удалось обработать
            <img src={Sad} alt="Грусть" className={styles.statusIcon} />
          </span>
        </div>
      </div>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(entry.id)}
        aria-label="Удалить запись"
      >
        <img src={Trash} alt="Удалить" className={styles.trashIcon} />
      </button>
    </li>
  );
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(2);
  return `${day}.${month}.${year}`;
}
