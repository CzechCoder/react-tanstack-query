import { ProductDetail } from "@/app/product/[id]/product-detail";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="p-6">
      <ProductDetail id={id} />
    </main>
  );
}
