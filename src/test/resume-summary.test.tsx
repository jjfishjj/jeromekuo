import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ResumeSummary from "@/pages/ResumeSummary";

describe("Resume summary", () => {
  it("preserves valid resume version parameters", () => {
    render(<MemoryRouter initialEntries={["/resume-summary?lang=fr&theme=cobalt&role=devrel"]}><ResumeSummary /></MemoryRouter>);
    const backLink = screen.getByRole("link", { name: /Retour au CV/ });
    expect(backLink).toHaveAttribute("href", "/resume?lang=fr&theme=cobalt&role=devrel");
    expect(document.querySelector("main")).toHaveClass("theme-cobalt");
  });

  it("normalizes invalid parameters to safe defaults", () => {
    render(<MemoryRouter initialEntries={["/resume-summary?lang=x&theme=x&role=x"]}><ResumeSummary /></MemoryRouter>);
    const backLink = screen.getByRole("link", { name: /返回完整履歷/ });
    expect(backLink).toHaveAttribute("href", "/resume?lang=zh&theme=lime&role=product");
    expect(document.querySelector("main")).toHaveClass("theme-lime");
  });
});
