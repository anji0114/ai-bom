import { ProductDetail } from "@/features/products/components/ProductDetail";

type ProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId } = await params;

  return (
    <div>
      <ProductDetail id={productId} />
    </div>
  );
};

export default ProductPage;
