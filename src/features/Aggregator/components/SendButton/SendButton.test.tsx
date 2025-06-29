import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SendButton } from "./SendButton";

describe("SendButton", () => {
  it("рендерится и по клику вызывает переданный onClick", () => {
    const onClick = vi.fn();
    render(<SendButton disabled={false} active={true} onClick={onClick} />);
    const btn = screen.getByRole("button", { name: /отправить/i });
    expect(btn).toBeEnabled();
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("задизейблена, когда disabled=true", () => {
    render(<SendButton disabled={true} active={false} onClick={() => {}} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("имеет класс активной кнопки при active=true", () => {
    const { container } = render(
      <SendButton disabled={false} active={true} onClick={() => {}} />
    );
    expect(container.querySelector("button")?.className).toMatch(
      /sendBtnActive/
    );
  });

  it("имеет класс неактивной кнопки при active=false", () => {
    const { container } = render(
      <SendButton disabled={false} active={false} onClick={() => {}} />
    );
    expect(container.querySelector("button")?.className).toMatch(
      /sendBtnInactive/
    );
  });
});
