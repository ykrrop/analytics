import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PageHeader } from "./PageHeader";

describe("PageHeader", () => {
  it("отображает правильный заголовок с выделениями", () => {
    render(<PageHeader />);
    const header = screen.getByText(/Загрузите/i);
    expect(header).toBeInTheDocument();
    const strongs = screen.getAllByRole("strong");
    const texts = strongs.map((el) => el.textContent);
    expect(texts).toEqual(expect.arrayContaining(["csv", "полную информацию"]));
  });
});
