import { z } from "zod";

export const checkoutOrderSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Phone number is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  address: z.string().min(5, "Address is required"),
  shippingMethod: z.string().min(1, "Please select a shipping method"),
});

export type CheckoutOrderSchema = z.infer<typeof checkoutOrderSchema>;
