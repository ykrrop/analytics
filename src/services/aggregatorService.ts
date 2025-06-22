import type { AggregationResult } from "../types";

export async function aggregateFile(
  file: File,
  rowsPerBatch: number = 10000,
  onPartial?: (partial: AggregationResult) => void
): Promise<AggregationResult> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`/aggregate?rows=${rowsPerBatch}`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Не удалось обработать файл");
  }

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let finalResult: AggregationResult = {};

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop()!; // оставляем неполную строку

    for (const line of lines) {
      if (!line) continue;
      try {
        const json = JSON.parse(line) as AggregationResult;
        finalResult = json;
        onPartial?.(json);
      } catch {
        // ignore unparsable fragments
      }
    }
  }

  // обрабатываем остаток буфера
  if (buffer) {
    try {
      const json = JSON.parse(buffer) as AggregationResult;
      finalResult = json;
      onPartial?.(json);
    } catch {
      // ignore invalid JSON
    }
  }

  return finalResult;
}
