import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Resume from "@/pages/Resume";

const clipboardWrite = vi.fn().mockResolvedValue(undefined);
const print = vi.fn();

describe("Resume page versions", () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState({}, "", "/resume?lang=zh&theme=lime&role=product");
    clipboardWrite.mockClear();
    print.mockClear();
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: clipboardWrite } });
    Object.defineProperty(window, "print", { configurable: true, value: print });
  });

  it.each([
    ["zh", "zh-Hant"], ["en", "en"], ["ja", "ja"], ["ko", "ko"], ["de", "de"], ["fr", "fr"], ["es", "es"],
  ])("switches to the %s language version", async (language, htmlLanguage) => {
    render(<Resume />);
    fireEvent.change(screen.getByLabelText("Language"), { target: { value: language } });
    await waitFor(() => expect(document.documentElement.lang).toBe(htmlLanguage));
    expect(new URL(window.location.href).searchParams.get("lang")).toBe(language);
  });

  it.each(["lime", "nvidia", "cobalt", "sand"])("switches to the %s color theme", theme => {
    render(<Resume />);
    fireEvent.click(screen.getByRole("button", { name: theme === "nvidia" ? "NVIDIA" : `${theme[0].toUpperCase()}${theme.slice(1)}` }));
    expect(screen.getByRole("button", { name: theme === "nvidia" ? "NVIDIA" : `${theme[0].toUpperCase()}${theme.slice(1)}` })).toHaveAttribute("aria-pressed", "true");
    expect(new URL(window.location.href).searchParams.get("theme")).toBe(theme);
  });

  it("copies a complete version URL and opens the print dialog", async () => {
    render(<Resume />);
    fireEvent.change(screen.getByLabelText("Language"), { target: { value: "ja" } });
    fireEvent.click(screen.getByRole("button", { name: "NVIDIA" }));
    fireEvent.click(screen.getByRole("button", { name: /SOLUTION ARCHITECT/ }));
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));

    await waitFor(() => expect(clipboardWrite).toHaveBeenCalledOnce());
    const copiedUrl = new URL(clipboardWrite.mock.calls[0][0]);
    expect(Object.fromEntries(copiedUrl.searchParams)).toMatchObject({ lang: "ja", theme: "nvidia", role: "solution" });

    fireEvent.click(screen.getByRole("button", { name: "PDF" }));
    expect(print).toHaveBeenCalledOnce();
  });

  it("ignores invalid stored preferences", () => {
    localStorage.setItem("resume-lang", "invalid");
    localStorage.setItem("resume-theme", "invalid");
    window.history.replaceState({}, "", "/resume");
    render(<Resume />);
    expect(screen.getByLabelText("Language")).toHaveValue("zh");
    expect(screen.getByRole("button", { name: "Lime" })).toHaveAttribute("aria-pressed", "true");
  });
});
