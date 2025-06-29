import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ResultSection } from "./ResultSection";
import type { AggregationResult } from "../../../../types";

describe("ResultSection", () => {
  it("показывает подсказку, когда showBlocks=false", () => {
    render(<ResultSection showBlocks={false} result={null} />);
    expect(screen.getByText(/здесь/i)).toBeInTheDocument();
    expect(screen.getByText(/появятся хайлайты/i)).toBeInTheDocument();
  });

  it("не рендерит ничего, если showBlocks=true, но результат null", () => {
    const { container } = render(
      <ResultSection showBlocks={true} result={null} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("рендерит ResultDisplay при наличии данных", () => {
    const fakeData: AggregationResult = {
      total_spend_galactic: 123,
      rows_affected: 5,
    };

    render(<ResultSection showBlocks={true} result={fakeData} />);
    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
