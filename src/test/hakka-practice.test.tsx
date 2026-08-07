import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HakkaPractice from "@/components/language/HakkaPractice";

describe("HakkaPractice", () => {
  it("switches accent and updates the displayed romanization", () => {
    render(<HakkaPractice />);
    expect(screen.getByText("anˋ ziiˋ seˇ")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "海陸腔" }));
    expect(screen.getByText("anˊ ziiˊ seˋ")).toBeInTheDocument();
  });

  it("filters topics and flips a card to its Chinese meaning", () => {
    render(<HakkaPractice />);
    fireEvent.click(screen.getByRole("button", { name: /飲食 2/ }));
    expect(screen.getByText("你食飽吂？")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "翻面查看中文" }));
    expect(screen.getByText("你吃飽了嗎？")).toBeInTheDocument();
  });

  it("explains when microphone access is unavailable", async () => {
    render(<HakkaPractice />);
    fireEvent.click(screen.getByRole("button", { name: "跟讀錄音" }));
    expect(await screen.findByRole("status")).toHaveTextContent("無法使用麥克風");
  });
});
