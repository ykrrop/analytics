import React from "react";
import styles from "./AggregatorPage.module.css";
import { useCsvAggregator } from "./hooks/useCsvAggregator";
import { PageHeader } from "./components/PageHeader/PageHeader";
import { FileDropzone } from "./components/FileDropzone/FileDropzone";
import { SendButton } from "./components/SendButton/SendButton";
import { ResultSection } from "./components/ResultSection/ResultSection";

export const AggregatorPage: React.FC = () => {
  const {
    inputRef,
    hasFile,
    fileName,
    isDragging,
    isLoading,
    showBlocks,
    result,
    error,
    isProcessed,
    onDrag,
    onDrop,
    onSelect,
    onChange,
    handleReset,
    handleSend,
  } = useCsvAggregator();

  return (
    <div className={styles.container}>
      <PageHeader />

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
          disabled={!hasFile || isLoading}
          active={hasFile}
          onClick={handleSend}
        />
      )}

      <ResultSection showBlocks={showBlocks} result={result} />
    </div>
  );
};
