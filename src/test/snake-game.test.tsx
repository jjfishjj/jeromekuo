import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { describe, expect, it } from "vitest";
import SnakeGame from "@/components/games/SnakeGame";

describe("SnakeGame", () => {
  it("starts, pauses, and resets the game", () => {
    render(<SnakeGame />);

    expect(screen.getByText(/Press/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Start/ }));
    expect(screen.getByRole("button", { name: /Pause/ })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Pause/ }));
    expect(screen.getByText("Paused")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Reset game" }));
    expect(screen.getByRole("button", { name: /Start/ })).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
