import React, { useState, useRef } from "react";
import { aggregateFile } from "../../services/aggregatorService";
import { useHistoryStore } from "../../store/historyStore";
import { useAggregatorStore } from "../../store/aggregatorStore";
import { Spinner } from "../../components/Spinner/Spinner";
import { ResultDisplay } from "../../components/ResultDisplay/ResultDisplay";
import styles from "./AggregatorPage.module.css";
import type { AggregationResult } from "../../types";
import Close from "../../assets/icons/Close.svg";

export const AggregatorPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const {
    fileName,
    isDragging,
    isLoading,
    showBlocks,
    result,
    error,
    isProcessed,
    isInvalidFormat,
    setState,
    resetState,
  } = useAggregatorStore();
  const addToHistory = useHistoryStore((s) => s.addToHistory);
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setState({ isDragging: e.type !== "dragleave" });
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer.files?.[0];
    if (f && f.type === "text/csv") {
      setFile(f);
      setState({
        fileName: f.name,
        error: null,
        isProcessed: false,
        isInvalidFormat: false,
      });
    } else {
      setState({
        fileName: f?.name || null,
        error: null,
        isInvalidFormat: true,
      });
    }
  };

  const onSelect = () => inputRef.current?.click();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.type === "text/csv") {
      setFile(f);
      setState({
        fileName: f.name,
        error: null,
        isProcessed: false,
        isInvalidFormat: false,
      });
    } else {
      setState({
        fileName: f?.name || null,
        error: null,
        isInvalidFormat: true,
      });
    }
  };

  const handleSend = () => {
    if (!file) {
      setState({
        error: "Файл не загружен. Пожалуйста, загрузите файл заново.",
      });
      return;
    }
    setState({
      showBlocks: true,
      isLoading: true,
      result: {} as AggregationResult,
      error: null,
      isProcessed: false,
    });

    aggregateFile(file, 10000, (partial) => {
      setState({ result: partial });
    })
      .then((final) => {
        addToHistory({
          id: Date.now().toString(),
          fileName: file.name,
          uploadDate: new Date().toISOString(),
          result: final,
        });
        setState({ isProcessed: true });
      })
      .catch((e) => {
        setState({ error: (e as Error).message, isProcessed: false });
        addToHistory({
          id: Date.now().toString(),
          fileName: file.name,
          uploadDate: new Date().toISOString(),
          result: null,
        });
      })
      .finally(() => {
        setState({ isLoading: false });
      });
  };

  const handleReset = () => {
    setFile(null);
    resetState();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        Загрузите <strong>csv</strong> файл и получите{" "}
        <strong>полную информацию</strong> о нём за сверхнизкое время
      </p>

      <div
        className={`${styles.dropArea} ${isDragging ? styles.active : ""} ${
          fileName ? styles.hasFile : ""
        } ${isInvalidFormat ? styles.invalidFormat : ""}`}
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
                className={`${styles.fileNameBtn} ${
                  isProcessed ? styles.processed : ""
                } ${isInvalidFormat ? styles.invalidFormat : ""}`}
              >
                {fileName}
              </button>
              <button
                className={styles.clearFileBtn}
                onClick={handleReset}
                aria-label="Удалить файл"
              >
                <img src={Close} alt="Крестик" />
              </button>
            </div>
            <p
              className={`${styles.hint} ${
                isInvalidFormat ? styles.invalidHint : ""
              }`}
            >
              {isInvalidFormat
                ? "упс, не то..."
                : isProcessed
                ? "готово!"
                : "файл загружен!"}
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

      {!isLoading && !isProcessed && !isInvalidFormat && (
        <button
          className={`${styles.sendBtn} ${
            file ? styles.sendBtnActive : styles.sendBtnInactive
          }`}
          onClick={handleSend}
          disabled={!file || isLoading}
        >
          Отправить
        </button>
      )}

      {!showBlocks && (
        <p className={styles.highlightsHint}>
          Здесь
          <br />
          появятся хайлайты
        </p>
      )}

      {error && <p className={styles.error}>{error}</p>}

      {showBlocks && result && <ResultDisplay data={result} />}
    </div>
  );
};
