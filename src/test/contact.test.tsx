import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import Contact from "@/pages/Contact";
import { LanguageProvider } from "@/i18n/LanguageContext";

afterEach(() => vi.unstubAllGlobals());

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
    expect(screen.getByRole("heading", { name: "傳送合作訊息" })).toBeInTheDocument();
    expect(screen.getByLabelText("姓名 *")).toBeRequired();
    expect(screen.getByLabelText("電子郵件 *")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("訊息內容 *")).toHaveAttribute("minlength", "10");
    expect(screen.getByRole("heading", { name: "常見問題" })).toBeInTheDocument();
    expect(screen.getByRole("form", { name: "傳送合作訊息" })).toHaveAttribute("action", "/api/contact");
    expect(screen.getByRole("form", { name: "傳送合作訊息" })).toHaveAttribute("method", "post");
  });

  it("sends the inquiry and announces a successful response", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <LanguageProvider><Contact /></LanguageProvider>
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText("姓名 *"), { target: { value: "Test Visitor" } });
    fireEvent.change(screen.getByLabelText("電子郵件 *"), { target: { value: "visitor@example.org" } });
    fireEvent.change(screen.getByLabelText("聯絡主題 *"), { target: { value: "product" } });
    fireEvent.change(screen.getByLabelText("訊息內容 *"), { target: { value: "I would like to discuss a collaboration." } });
    fireEvent.submit(screen.getByRole("form", { name: "傳送合作訊息" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("訊息已送出"));
    expect(fetchMock).toHaveBeenCalledWith("/api/contact", expect.objectContaining({ method: "POST" }));
    const [, request] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(JSON.parse(String(request.body))).toMatchObject({ name: "Test Visitor", email: "visitor@example.org", topic: "product", message: "I would like to discuss a collaboration." });
  });
});
