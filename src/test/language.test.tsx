import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { beforeEach, describe, expect, it } from "vitest";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";

const LanguageHarness = () => {
  const { lang, setLang, t } = useLanguage();
  return (
    <div>
      <output>{lang}</output>
      <span>{t("nav.home")}</span>
      <button onClick={() => setLang("en")}>English</button>
      <button onClick={() => setLang("he")}>Hebrew</button>
    </div>
  );
};

describe("language provider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.dir = "ltr";
    document.documentElement.lang = "zh";
  });

  it("switches translations and persists the language", () => {
    render(<LanguageProvider><LanguageHarness /></LanguageProvider>);
    expect(screen.getByText("首頁")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "English" }));
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(localStorage.getItem("site-lang")).toBe("en");
    expect(document.documentElement.lang).toBe("en");
  });

  it("sets RTL direction for Hebrew", () => {
    render(<LanguageProvider><LanguageHarness /></LanguageProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Hebrew" }));
    expect(document.documentElement.dir).toBe("rtl");
    expect(document.documentElement.lang).toBe("he");
  });
});
