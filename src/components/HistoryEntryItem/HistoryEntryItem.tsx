import React from "react";
import styles from "./HistoryEntryItem.module.css";
import type { HistoryEntry } from "../../types";
import Trash from "../../assets/icons/Trash.svg";
import File from "../../assets/icons/File.svg";
import { formatDate } from "../../utils/format";
import { SmileIcon } from "./SmileIcon";
import { SadIcon } from "./SadIcon";

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

  const successColor = isSuccess ? "#201B10" : "#8F64AE";
  const errorColor = isSuccess ? "#8F64AE" : "#201B10";

  const fileInfoColor = "#201B10";

  return (
    <li className={styles.entryContainer}>
      <div
        className={styles.entryBlock}
        onClick={() => isSuccess && onSelect(entry)}
      >
        <div className={styles.fileInfo}>
          <img src={File} alt="Файл" className={styles.fileIcon} />
          <span className={styles.fileName} style={{ color: fileInfoColor }}>
            {entry.fileName}
          </span>
          <span className={styles.date} style={{ color: fileInfoColor }}>
            {formatDate(entry.uploadDate)}
          </span>
        </div>
        <div className={styles.statusContainer}>
          <span
            className={styles.statusSuccess}
            style={{ color: successColor }}
          >
            Обработан успешно
            <SmileIcon color={successColor} />
          </span>
          <span className={styles.statusError} style={{ color: errorColor }}>
            Не удалось обработать
            <SadIcon color={errorColor} />
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
