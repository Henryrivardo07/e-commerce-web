import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().optional(),
  price: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, "Price must be positive"),
  stock: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val >= 0, "Stock must be positive"),
  categoryId: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), "Category ID is required"),
  images: z
    .array(z.instanceof(File))
    .nonempty("At least one image is required")
    .optional(),
});

export type ProductSchema = z.infer<typeof productSchema>;
