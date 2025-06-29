import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FileDropzone } from "./FileDropzone";

vi.mock("../../../../components/Spinner/Spinner.tsx", () => ({
  Spinner: () => <div data-testid="spinner" />,
}));

describe("FileDropzone", () => {
  const defaultProps = {
    inputRef: { current: null },
    fileName: null,
    isDragging: false,
    isLoading: false,
    isProcessed: false,
    error: null,
    onDrag: vi.fn(),
    onDrop: vi.fn(),
    onSelect: vi.fn(),
    onChange: vi.fn(),
    onReset: vi.fn(),
  };

  it("показывает кнопку загрузить и подсказку, если нет файла и не загружается", () => {
    render(<FileDropzone {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: /загрузить файл/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/или перетащите сюда/i)).toBeInTheDocument();
  });

  it("показывает спиннер и текст парсинга, когда isLoading=true", () => {
    render(<FileDropzone {...defaultProps} isLoading />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.getByText(/идёт парсинг файла/i)).toBeInTheDocument();
  });

  it("показывает имя файла и кнопку удаления, когда fileName задан", () => {
    render(<FileDropzone {...defaultProps} fileName="test.csv" />);
    expect(screen.getByText("test.csv")).toBeInTheDocument();
    expect(screen.getByLabelText(/удалить файл/i)).toBeInTheDocument();
    expect(screen.getByText(/файл загружен/i)).toBeInTheDocument();
  });

  it("показывает сообщение об ошибке при error", () => {
    render(
      <FileDropzone
        {...defaultProps}
        fileName="bad.txt"
        error="упс, не то..."
      />
    );
    expect(screen.getByText(/упс, не то/i)).toBeInTheDocument();
    const btn = screen.getByRole("button", { name: /bad\.txt/i });
    expect(btn.className).toContain("invalidFormat");
  });

  describe("взаимодействия с пользователем", () => {
    it("вызывает onDrag, onDrop и onSelect", () => {
      const props = { ...defaultProps };
      render(<FileDropzone {...props} />);
      const dropArea = screen.getByText(/или перетащите сюда/i).closest("div")!;
      fireEvent.dragEnter(dropArea);
      expect(props.onDrag).toHaveBeenCalled();
      fireEvent.drop(dropArea);
      expect(props.onDrop).toHaveBeenCalled();

      const uploadBtn = screen.getByRole("button", { name: /загрузить файл/i });
      fireEvent.click(uploadBtn);
      expect(props.onSelect).toHaveBeenCalled();
    });

    it("вызывает onChange и onReset", () => {
      const props = { ...defaultProps, fileName: "a.csv" };
      const { container } = render(<FileDropzone {...props} />);
      const input = container.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      expect(input).toBeTruthy();

      const file = new File([""], "a.csv", { type: "text/csv" });
      fireEvent.change(input, { target: { files: [file] } });
      expect(props.onChange).toHaveBeenCalled();

      const clearBtn = screen.getByLabelText(/удалить файл/i);
      fireEvent.click(clearBtn);
      expect(props.onReset).toHaveBeenCalled();
    });
  });
});
