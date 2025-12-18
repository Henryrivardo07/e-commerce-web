// route.ts
import { NextRequest, NextResponse } from "next/server";
import apiClient from "@/services/apiClient.service"; // absolute backend URL
import { ApiError, ApiResponse } from "@/types/Api.type";
import {  Product } from "@/types/Product";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const isActive = Boolean(searchParams.get("isActive"));
    const q = searchParams.get("q");

    const authHeader = req.headers.get("authorization");

    const params: Record<string, string | number | boolean> = { page, limit, isActive };
    if (q) params.q = q;
    

    const { data } = await apiClient.get("/seller/products", {
      params,
      headers: { Authorization: authHeader || "" },
    });

    return NextResponse.json(data);
  } catch (error: unknown) {
    let message = "Something went wrong";
    if (typeof error === "object" && error !== null && "response" in error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      message = axiosError.response?.data?.message ?? message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ message } as ApiError, { status: 400 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const formData = await req.formData();

    const title = formData.get("title") as string | null;
    const description = (formData.get("description") as string) || "";
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const categoryId = Number(formData.get("categoryId"));
    const isActive = formData.get("isActive") === "true";
    const images = formData.getAll("images") as File[];
    

    // Validate required fields
    if (!title || isNaN(price) || isNaN(stock) || isNaN(categoryId)) {
      return NextResponse.json<ApiError>(
        { message: "Title, price, stock, and category ID are required" },
        { status: 400 }
      );
    }

    // Construct FormData to send to backend
    const uploadForm = new FormData();
    uploadForm.append("title", title);
    uploadForm.append("description", description);
    uploadForm.append("price", price.toString());
    uploadForm.append("stock", stock.toString());
    uploadForm.append("categoryId", categoryId.toString());
    uploadForm.append("isActive", isActive.toString());

    for (const file of images) {
      uploadForm.append("images", file);
    }

    // ✅ Do NOT manually set Content-Type; Axios handles multipart/form-data automatically
    const { data } = await apiClient.post<ApiResponse<Product>>(
      "/seller/products",
      uploadForm,
      {
        headers: {
          Authorization: authHeader,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return NextResponse.json<ApiResponse<Product>>(data, { status: 200 });
  } catch (error: unknown) {
    let message = "Something went wrong";

    if (typeof error === "object" && error !== null && "response" in error) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      message = axiosError.response?.data?.message ?? message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    const err: ApiError = { message };
    return NextResponse.json(err, { status: 400 });
  }
}
