import React, { useState, useRef } from "react";
import { aggregateFile } from "../../services/aggregatorService";
import { useHistoryStore } from "../../store/historyStore";
import { Spinner } from "../../shared/ui/Spinner/Spinner";
import { ResultDisplay } from "../../components/ResultDisplay/ResultDisplay";
import styles from "./AggregatorPage.module.css";
import type { AggregationResult } from "../../types";

export const AggregatorPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBlocks, setShowBlocks] = useState(false);
  const [result, setResult] = useState<AggregationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessed, setIsProcessed] = useState(false);
  const addToHistory = useHistoryStore((s) => s.addToHistory);
  const inputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setFile(null);
    setShowBlocks(false);
    setResult(null);
    setError(null);
    setIsProcessed(false);
    setIsLoading(false);
  };

  const onDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type !== "dragleave");
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f && f.type === "text/csv") {
      setFile(f);
      setError(null);
      setIsProcessed(false);
    } else {
      setError("Пожалуйста, загрузите CSV-файл.");
    }
  };

  const onSelect = () => inputRef.current?.click();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.type === "text/csv") {
      setFile(f);
      setError(null);
      setIsProcessed(false);
    } else {
      setError("Пожалуйста, загрузите CSV-файл.");
    }
  };

  const handleSend = () => {
    if (!file) return;
    setShowBlocks(true);
    setIsLoading(true);
    setResult({} as AggregationResult);
    setError(null);
    setIsProcessed(false);

    aggregateFile(file, 10000, (partial) => {
      setResult(partial);
    })
      .then((final) => {
        addToHistory({
          id: Date.now().toString(),
          fileName: file.name,
          uploadDate: new Date().toISOString(),
          result: final,
        });
        setIsProcessed(true);
      })
      .catch((e) => {
        setError((e as Error).message);
        setIsProcessed(false);
        addToHistory({
          id: Date.now().toString(),
          fileName: file.name,
          uploadDate: new Date().toISOString(),
          result: null,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        Загрузите csv файл и получите полную информацию о нём за сверхнизкое
        время
      </p>

      <div
        className={`${styles.dropArea} ${isDragging ? styles.active : ""} ${
          file ? styles.hasFile : ""
        }`}
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
          <Spinner />
        ) : file ? (
          <div className={styles.fileSection}>
            <div className={styles.fileRow}>
              <button
                className={`${styles.fileNameBtn} ${
                  isProcessed ? styles.processed : ""
                }`}
              >
                {file.name}
              </button>
              <button className={styles.clearFileBtn} onClick={resetState}>
                ×
              </button>
            </div>
            <p className={styles.hint}>
              {isProcessed ? "готово!" : "файл загружен!"}
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

      {!showBlocks && file && !isLoading && (
        <button className={styles.sendBtn} onClick={handleSend}>
          Отправить
        </button>
      )}

      {!showBlocks && (
        <p className={styles.highlightsHint}>Здесь появятся хайлайты</p>
      )}

      {error && <p className={styles.error}>{error}</p>}

      {showBlocks && result && <ResultDisplay data={result} />}
    </div>
  );
};
