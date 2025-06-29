import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { useHistoryStore } from "../../store/historyStore";
import { HistoryPage } from "../../features/History/HistoryPage";

vi.mock("../../components/Modal/Modal.tsx", () => ({
  Modal: ({ children }: React.PropsWithChildren<object>) => (
    <div data-testid="modal">{children}</div>
  ),
}));

describe("Интеграция: HistoryPage", () => {
  beforeEach(() => {
    useHistoryStore.setState({
      history: [
        {
          id: "1",
          fileName: "good.csv",
          uploadDate: new Date().toISOString(),
          result: {
            total_spend_galactic: 999,
            rows_affected: 42,
          },
        },
        {
          id: "2",
          fileName: "bad.csv",
          uploadDate: new Date().toISOString(),
          result: null,
        },
      ],
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("отображает список истории с двумя файлами", () => {
    render(
      <MemoryRouter>
        <HistoryPage />
      </MemoryRouter>
    );

    expect(screen.getByText("good.csv")).toBeInTheDocument();
    expect(screen.getByText("bad.csv")).toBeInTheDocument();

    const successStatuses = screen.getAllByText(/обработан успешно/i);
    expect(successStatuses.length).toBeGreaterThanOrEqual(1);

    const errorStatuses = screen.getAllByText(/не удалось обработать/i);
    expect(errorStatuses.length).toBeGreaterThanOrEqual(1);
  });

  it("открывает модалку при клике по успешной записи", async () => {
    render(
      <MemoryRouter>
        <HistoryPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("good.csv"));
    await waitFor(() => {
      expect(screen.getByTestId("modal")).toBeInTheDocument();
    });
    expect(screen.getByText(/общие расходы/i)).toBeInTheDocument();
  });

  it("удаляет запись из истории", async () => {
    render(
      <MemoryRouter>
        <HistoryPage />
      </MemoryRouter>
    );

    const deleteBtn = screen.getAllByLabelText(/удалить запись/i)[0];
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(screen.queryByText("good.csv")).not.toBeInTheDocument();
    });
  });
});
