"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Product, NewProduct } from "@/db/schema";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/app/products/actions";
import { uploadImage, deleteImage } from "@/lib/blob";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Plus } from "lucide-react";
import { CATEGORIES } from "@/app/data/products";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((v) => !isNaN(parseFloat(v)) && parseFloat(v) > 0, {
      message: "Price must be a positive number",
    }),
  category: z.string().min(1, "Category is required"),
  badge: z.string(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function ProductsManager({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<Product | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "",
      category: "",
      badge: "none",
    },
  });

  function openCreate() {
    setEditing(null);
    setImageFile(null);
    setImagePreview(null);
    form.reset({ name: "", price: "", category: "", badge: "none" });
    setDialogOpen(true);
  }

  function openEdit(product: Product) {
    setEditing(product);
    setImagePreview(product.image);
    setImageFile(null);
    form.reset({
      name: product.name,
      price: String(product.price / 100),
      category: product.category,
      badge: product.badge ?? "none",
    });
    setDialogOpen(true);
  }

  function openDelete(product: Product) {
    setDeleting(product);
    setDeleteDialogOpen(true);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  function onSubmit(values: ProductFormValues) {
    // Validate image exists
    if (!imagePreview) {
      toast.error("Please select an image");
      return;
    }

    const data: NewProduct = {
      name: values.name,
      slug: values.name.toLowerCase().replace(/\s+/g, "-"),
      price: Math.round(parseFloat(values.price) * 100),
      image: imagePreview as string,
      category: values.category,
      badge: values.badge === "none" ? null : values.badge,
    };

    startTransition(async () => {
      try {
        let imageUrl = imagePreview;

        // Upload new image if selected
        if (imageFile) {
          setIsUploading(true);
          imageUrl = await uploadImage(imageFile);
          setIsUploading(false);
        }

        data.image = imageUrl;

        if (editing) {
          const [updated] = await updateProduct(editing.id, data);
          setProducts((prev) =>
            prev.map((p) => (p.id === updated.id ? updated : p)),
          );
          toast.success("Product updated");
        } else {
          const [created] = await createProduct(data);
          setProducts((prev) => [...prev, created]);
          toast.success("Product created");
        }
        setDialogOpen(false);
        setImageFile(null);
        setImagePreview(null);
      } catch (e: any) {
        toast.error(e.message);
        setIsUploading(false);
      }
    });
  }

  function handleDelete() {
    if (!deleting) return;
    startTransition(async () => {
      try {
        await deleteProduct(deleting.id);
        setProducts((prev) => prev.filter((p) => p.id !== deleting.id));
        toast.success("Product deleted");
        setDeleteDialogOpen(false);
        setDeleting(null);
      } catch (e: any) {
        toast.error(e.message);
      }
    });
  }

  return (
    <>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-zinc-100">Products</CardTitle>
          <Button size="sm" onClick={openCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400">Name</TableHead>
                <TableHead className="text-zinc-400">Category</TableHead>
                <TableHead className="text-zinc-400">Price</TableHead>
                <TableHead className="text-zinc-400">Badge</TableHead>
                <TableHead className="text-zinc-400 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length > 0 ? (
                products.map((product) => (
                  <TableRow
                    key={product.id}
                    className="border-zinc-800 hover:bg-zinc-800/50"
                  >
                    <TableCell className="font-medium text-zinc-100">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-zinc-400">
                      {product.category}
                    </TableCell>
                    <TableCell className="text-zinc-400">
                      £{(product.price / 100).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {product.badge ? (
                        <Badge
                          variant={
                            product.badge === "Hot"
                              ? "hot"
                              : product.badge === "New"
                                ? "new"
                                : "default"
                          }
                        >
                          {product.badge}
                        </Badge>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                          onClick={() => openEdit(product)}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => openDelete(product)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-zinc-500 py-10"
                  >
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Product" : "New Product"}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-2"
          >
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...form.register("name")}
                className="bg-zinc-800 border-zinc-700"
                placeholder="e.g. Classic Hoodie"
              />
              {form.formState.errors.name && (
                <p className="text-xs text-red-400">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Price (£)</Label>
              <Input
                id="price"
                type="number"
                step="1"
                {...form.register("price")}
                className="bg-zinc-800 border-zinc-700"
                placeholder="e.g. 45"
              />
              {form.formState.errors.price && (
                <p className="text-xs text-red-400">
                  {form.formState.errors.price.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Product Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="bg-zinc-800 border-zinc-700"
              />
              {imagePreview && (
                <div className="relative w-full h-48 bg-zinc-800 rounded border border-zinc-700 overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {!imagePreview && (
                <p className="text-xs text-red-400">Image is required</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Category</Label>
              <Select
                value={form.watch("category")}
                onValueChange={(v) =>
                  form.setValue("category", v, { shouldValidate: true })
                }
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.category && (
                <p className="text-xs text-red-400">
                  {form.formState.errors.category.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Badge</Label>
              <Select
                value={form.watch("badge")}
                onValueChange={(v) => form.setValue("badge", v)}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Select badge" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Hot">Hot</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="border-zinc-700"
                onClick={() => setDialogOpen(false)}
                disabled={isPending || isUploading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending || isUploading}>
                {isUploading
                  ? "Uploading..."
                  : isPending
                    ? "Saving..."
                    : editing
                      ? "Save Changes"
                      : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <p className="text-zinc-400">
            Are you sure you want to delete{" "}
            <span className="text-zinc-100 font-semibold">
              {deleting?.name}
            </span>
            ? This cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-zinc-700"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
