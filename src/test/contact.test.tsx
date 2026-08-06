import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Contact from "@/pages/Contact";
import { LanguageProvider } from "@/i18n/LanguageContext";

describe("Contact page", () => {
  it("does not expose fake email or booking links when settings are empty", () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <LanguageProvider><Contact /></LanguageProvider>
      </MemoryRouter>,
    );

    expect(screen.queryByRole("link", { name: /Email/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /預約 30 分鐘免費諮詢/ })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "待補充" })).toBeDisabled();
    expect(screen.getByRole("button", { name: /待設定/ })).toBeDisabled();
    expect(screen.getByRole("link", { name: "GitHub — @jjfishjj" })).toHaveAttribute("href", "https://github.com/jjfishjj");
  });
});
