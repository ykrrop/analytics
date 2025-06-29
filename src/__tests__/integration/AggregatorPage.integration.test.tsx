import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { describe, it, beforeEach, vi, afterEach, expect } from "vitest";

import { MemoryRouter } from "react-router-dom";
import { useHistoryStore } from "../../store/historyStore";
import { useAggregatorStore } from "../../store/aggregatorStore";
import { AggregatorPage } from "../../features/Aggregator/AggregatorPage";

vi.mock("../../components/Spinner/Spinner.tsx", () => ({
  Spinner: () => <div data-testid="spinner" />,
}));

describe("Интеграция: AggregatorPage", () => {
  beforeEach(() => {
    useHistoryStore.setState({ history: [] });
    useAggregatorStore.getState().resetState();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("полный сценарий: загрузка CSV, отправка, прогресс, финальные данные и запись в историю", async () => {
    const fakeChunks = [
      JSON.stringify({ rows_affected: 1 }) + "\n",
      JSON.stringify({ rows_affected: 2 }) + "\n",
      JSON.stringify({ rows_affected: 3 }),
    ];
    const encoder = new TextEncoder();
    let controllerRef!: ReadableStreamDefaultController;
    const readable = new ReadableStream({
      start(controller) {
        controllerRef = controller;
      },
    });

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        body: readable,
      })
    );

    render(
      <MemoryRouter>
        <AggregatorPage />
      </MemoryRouter>
    );

    const file = new File(["a,b\n1,2"], "test.csv", { type: "text/csv" });
    const input = screen.getByTestId("file-input");
    await act(async () => {
      fireEvent.change(input, { target: { files: [file] } });
    });

    const sendBtn = screen.getByRole("button", { name: /отправить/i });
    await act(async () => {
      fireEvent.click(sendBtn);
    });

    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    await act(async () => {
      for (const chunk of fakeChunks) {
        controllerRef.enqueue(encoder.encode(chunk));
      }
      controllerRef.close();
    });

    await waitFor(() => {
      expect(screen.getByText("3")).toBeInTheDocument();
    });

    const history = useHistoryStore.getState().history;
    expect(history).toHaveLength(1);
    expect(history[0].fileName).toBe("test.csv");
    expect(history[0].result?.rows_affected).toBe(3);
  });

  it("обработка ошибки на сервере: показываем текст ошибки и пишем в историю с null-результатом", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    render(
      <MemoryRouter>
        <AggregatorPage />
      </MemoryRouter>
    );

    const file = new File(["x"], "bad.csv", { type: "text/csv" });
    const input = screen.getByTestId("file-input");
    await act(async () => {
      fireEvent.change(input, { target: { files: [file] } });
      fireEvent.click(screen.getByRole("button", { name: /отправить/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/упс, не то/i)).toBeInTheDocument();
    });

    const history = useHistoryStore.getState().history;
    expect(history).toHaveLength(1);
    expect(history[0].result).toBeNull();
  });
});
