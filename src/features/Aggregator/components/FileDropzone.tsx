import type { ChangeEvent, DragEvent, RefObject } from "react";
import styles from "../AggregatorPage.module.css";
import { Spinner } from "../../../components/Spinner/Spinner";
import { CloseButton } from "../../../components/CloseButton/CloseButton";

interface FileDropzoneProps {
  inputRef: RefObject<HTMLInputElement | null>;
  fileName: string | null;
  isDragging: boolean;
  isLoading: boolean;
  isProcessed: boolean;
  error: string | null;

  onDrag: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onSelect: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  inputRef,
  fileName,
  isDragging,
  isLoading,
  isProcessed,
  error,
  onDrag,
  onDrop,
  onSelect,
  onChange,
  onReset,
}) => (
  <div
    className={`
      ${styles.dropArea}
      ${isDragging ? styles.active : ""}
      ${fileName ? styles.hasFile : ""}
      ${error ? styles.invalidFormat : ""}
    `}
    onDragEnter={onDrag}
    onDragOver={onDrag}
    onDragLeave={onDrag}
    onDrop={onDrop}
  >
    <input
      ref={inputRef}
      type="file"
      accept=".csv"
      className={styles.hiddenInput}
      onChange={onChange}
    />

    {isLoading ? (
      <div className={styles.spinnerContainer}>
        <Spinner />
        <p className={styles.parsingText}>идёт парсинг файла</p>
      </div>
    ) : fileName ? (
      <div className={styles.fileSection}>
        <div className={styles.fileRow}>
          <button
            className={`
              ${styles.fileNameBtn}
              ${isProcessed ? styles.processed : ""}
              ${error ? styles.invalidFormat : ""}
            `}
          >
            {fileName}
          </button>
          <CloseButton
            onClick={onReset}
            className={styles.clearFileBtn}
            ariaLabel="Удалить файл"
          />
        </div>
        <p
          className={`
            ${styles.hint}
            ${error ? styles.invalidHint : ""}
          `}
        >
          {error ? "упс, не то..." : isProcessed ? "готово!" : "файл загружен!"}
        </p>
      </div>
    ) : (
      <>
        <button className={styles.uploadBtn} onClick={onSelect}>
          Загрузить файл
        </button>
        <p className={styles.hint}>или перетащите сюда</p>
      </>
    )}
  </div>
);
