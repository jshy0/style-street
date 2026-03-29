jest.mock("@/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

import { auth } from "@/auth";
import { isAdmin, requireAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

const mockAuth = auth as jest.Mock;
const mockRedirect = jest.mocked(redirect);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("isAdmin", () => {
  it("returns true when the user has the admin role", async () => {
    mockAuth.mockResolvedValue({ user: { role: "admin" } });
    expect(await isAdmin()).toBe(true);
  });

  it("returns false when the user has the user role", async () => {
    mockAuth.mockResolvedValue({ user: { role: "user" } });
    expect(await isAdmin()).toBe(false);
  });

  it("returns false when there is no session", async () => {
    mockAuth.mockResolvedValue(null);
    expect(await isAdmin()).toBe(false);
  });
});

describe("requireAdmin", () => {
  it("redirects to sign-in when there is no session", async () => {
    mockAuth.mockResolvedValue(null);
    await requireAdmin();
    expect(mockRedirect).toHaveBeenCalledWith("/api/auth/signin");
  });

  it("redirects to home when the user is not an admin", async () => {
    mockAuth.mockResolvedValue({ user: { role: "user" } });
    await requireAdmin();
    expect(mockRedirect).toHaveBeenCalledWith("/");
  });

  it("returns the session when the user is an admin", async () => {
    const session = { user: { role: "admin" } };
    mockAuth.mockResolvedValue(session);
    const result = await requireAdmin();
    expect(result).toBe(session);
  });
});
