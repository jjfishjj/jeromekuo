import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Index from "@/pages/Index";
import { LanguageProvider } from "@/i18n/LanguageContext";

describe("homepage accessibility", () => {
  it("exposes the skills selector as an accessible toggle button group", () => {
    const { container } = render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <LanguageProvider><Index /></LanguageProvider>
      </MemoryRouter>,
    );

    const group = screen.getByRole("group");
    const buttons = within(group).getAllByRole("button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    expect(screen.queryByRole("tab")).not.toBeInTheDocument();

    fireEvent.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
    expect(container.querySelector(".home-portrait-media img")).toHaveAttribute("alt", "");
    const heroActions = container.querySelector(".home-hero-actions");
    expect(heroActions?.querySelectorAll("a")).toHaveLength(2);
    expect(heroActions?.querySelector("button")).toBeNull();
    expect(container.querySelector("a button, button a")).toBeNull();
  });
});
