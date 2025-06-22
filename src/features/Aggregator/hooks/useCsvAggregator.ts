import { useState, useRef, type ChangeEvent, type DragEvent } from "react";
import { aggregateFile } from "../../../services/aggregatorService";
import { useHistoryStore } from "../../../store/historyStore";
import { useAggregatorStore } from "../../../store/aggregatorStore";
import type { AggregationResult } from "../../../types";

export function useCsvAggregator() {
  const [file, setFile] = useState<File | null>(null);
  const hasFile = Boolean(file);

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

  const onDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setState({ isDragging: e.type !== "dragleave" });
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer.files?.[0];
    if (f?.type === "text/csv") {
      setFile(f);
      setState({ fileName: f.name, error: null, isProcessed: false });
    } else {
      setState({ fileName: f?.name || null, error: "упс, не то..." });
    }
  };

  const onSelect = () => {
    inputRef.current?.click();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f?.type === "text/csv") {
      setFile(f);
      setState({ fileName: f.name, error: null, isProcessed: false });
    } else {
      setState({ fileName: f?.name || null, error: "упс, не то..." });
    }
  };

  const handleReset = () => {
    setFile(null);
    resetState();
    if (inputRef.current) inputRef.current.value = "";
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
      .finally(() => setState({ isLoading: false }));
  };

  return {
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
  };
}
