import React, { useState, useRef } from "react";
import { aggregateFile } from "../../services/aggregatorService";
import { useHistoryStore } from "../../store/historyStore";
import { useAggregatorStore } from "../../store/aggregatorStore";

import { FileDropzone } from "./components/FileDropzone";
import { SendButton } from "./components/SendButton";
import { ResultSection } from "./components/ResultSection";

import styles from "./AggregatorPage.module.css";
import type { AggregationResult } from "../../types";

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
      setState({ fileName: f.name, error: null, isProcessed: false });
    } else {
      setState({ fileName: f?.name || null, error: "упс, не то..." });
    }
  };

  const onSelect = () => inputRef.current?.click();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.type === "text/csv") {
      setFile(f);
      setState({ fileName: f.name, error: null, isProcessed: false });
    } else {
      setState({ fileName: f?.name || null, error: "упс, не то..." });
    }
  };

  const handleSend = () => {
    if (!file) {
      setState({ error: "упс, не то..." });
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
      .catch(() => {
        setState({ error: "упс, не то...", isProcessed: false });
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
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        Загрузите <strong>csv</strong> файл и получите{" "}
        <strong>полную информацию</strong> о нём за сверхнизкое время
      </p>

      <FileDropzone
        inputRef={inputRef}
        fileName={fileName}
        isDragging={isDragging}
        isLoading={isLoading}
        isProcessed={isProcessed}
        error={error}
        onDrag={onDrag}
        onDrop={onDrop}
        onSelect={onSelect}
        onChange={onChange}
        onReset={handleReset}
      />

      {!isLoading && !isProcessed && !error && (
        <SendButton
          disabled={!file || isLoading}
          active={!!file}
          onClick={handleSend}
        />
      )}

      <ResultSection showBlocks={showBlocks} result={result} />
    </div>
  );
};
