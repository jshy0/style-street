jest.mock("@/lib/db", () => ({
  db: {
    // Drizzle uses a builder chain: db.select().from().where()
    // Each method needs to return an object with the next method on it
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockResolvedValue([]),
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    returning: jest.fn().mockResolvedValue([]),
    update: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
  },
}));

jest.mock("@/lib/admin", () => ({
  requireAdmin: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("@vercel/blob", () => ({
  del: jest.fn().mockResolvedValue(undefined),
}));

import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
import {
  getFilteredProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/app/products/actions";
import { del } from "@vercel/blob";

const mockDb = db as jest.Mocked<typeof db>;
const mockRequireAdmin = requireAdmin as jest.Mock;
const mockDelFromBlob = del as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("admin-protected actions", () => {
  it("calls requireAdmin before creating a product", async () => {
    await createProduct({ name: "Test", price: 1000 } as any);
    expect(mockRequireAdmin).toHaveBeenCalled();
  });

  it("calls requireAdmin before updating a product", async () => {
    await updateProduct(1, { name: "Updated" });
    expect(mockRequireAdmin).toHaveBeenCalled();
  });

  it("calls requireAdmin before deleting a product", async () => {
    await deleteProduct(1);
    expect(mockRequireAdmin).toHaveBeenCalled();
  });
});

describe("delete from vercel blob", () => {
  it("deletes the image from blob when a product is deleted", async () => {
    await deleteProduct(1);
    expect(mockDelFromBlob).toHaveBeenCalled();
  });
});
