import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getProductById } from "@/services/product.service";
import ProductDetail from "./components/ProductDetail";

interface ProductPageProps {
  params: { slug: string; id: string };
}

export const revalidate = 60; // ✅ ISR: re-generate every 60s

export default async function ProductPage({ params }: ProductPageProps) {
  const queryClient = new QueryClient();
  const productId = Number(params.id);

  // Prefetch product for hydration
  await queryClient.prefetchQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetail productId={productId} slug={params.slug} />
    </HydrationBoundary>
  );
}
