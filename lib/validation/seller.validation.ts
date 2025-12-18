
import { z } from "zod";

export const openStoreSchema = z.object({
  name: z.string().min(2, "Store name must be at least 2 characters"),
  slug: z.string().min(2, "Store domain must be at least 2 characters"),
  address: z.string().min(3, "Address must be at least 3 characters"),
});

export type TOpenStoreSchema = z.infer<typeof openStoreSchema>;
