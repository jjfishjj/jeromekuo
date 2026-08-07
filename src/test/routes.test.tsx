import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/pages/Index", () => ({ default: () => <h1>Home route</h1> }));
vi.mock("@/pages/Memory", () => ({ default: () => <h1>Memory route</h1> }));
vi.mock("@/pages/Journal", () => ({ default: () => <h1>Journal route</h1> }));
vi.mock("@/pages/Language", () => ({ default: () => <h1>Language route</h1> }));
vi.mock("@/pages/Game", () => ({ default: () => <h1>Game route</h1> }));
vi.mock("@/pages/Systems", () => ({ default: () => <h1>Systems route</h1> }));
vi.mock("@/pages/Contact", () => ({ default: () => <h1>Contact route</h1> }));
vi.mock("@/pages/Videos", () => ({ default: () => <h1>Videos route</h1> }));
vi.mock("@/pages/Lectures", () => ({ default: () => <h1>Lectures route</h1> }));
vi.mock("@/pages/Resume", () => ({ default: () => <h1>Resume route</h1> }));
vi.mock("@/pages/ResumeSummary", () => ({ default: () => <h1>Resume summary route</h1> }));
vi.mock("@/pages/AdminLogin", () => ({ default: () => <h1>Admin login route</h1> }));
vi.mock("@/pages/AdminDashboard", () => ({ default: () => <h1>Admin route</h1> }));
vi.mock("@/pages/NotFound", () => ({ default: () => <h1>Not found route</h1> }));

import App from "@/App";

describe("application routes", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("renders the home route", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Home route" })).toBeInTheDocument();
  });

  it("renders the catch-all route for an unknown URL", async () => {
    window.history.pushState({}, "", "/missing-page");
    render(<App />);
    await waitFor(() => expect(screen.getByRole("heading", { name: "Not found route" })).toBeInTheDocument());
  });

  it("renders the public resume summary route", async () => {
    window.history.pushState({}, "", "/resume-summary");
    render(<App />);
    await waitFor(() => expect(screen.getByRole("heading", { name: "Resume summary route" })).toBeInTheDocument());
  });

  it("keeps the legacy resume summary route working", async () => {
    window.history.pushState({}, "", "/resume/summary");
    render(<App />);
    await waitFor(() => expect(screen.getByRole("heading", { name: "Resume summary route" })).toBeInTheDocument());
  });
});
