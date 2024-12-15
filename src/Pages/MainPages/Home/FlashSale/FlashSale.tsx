import { Alert, Button, Spin } from "antd";
import ProductCard from "../../../../Components/Shared/ProductCard";
import { TProduct } from "../../../../Interface";
import { useGetProductsQuery } from "../../../../Redux/Features/Product/productApi";

const FlashSale = () => {
  const { data = {}, isLoading, error } = useGetProductsQuery({ brand: "", category: "", page: 1, limit: 10, searchTerm: "" });
  const { data: products } = data?.data || {};

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spin tip="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed to load users."
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className="bg-white lg:mx-16 p-4 mt-4">
      {/* title */}
      <div className="py-4 ">
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-xl font-semibold ">Flash Sale</h2>
          <Button
            color="primary"
            size="large"
            type="primary"
            variant="outlined"
            shape="default"
            className="border-blue-500"
          >
            SHOP ALL PRODUCTS
          </Button>
        </div>
        <hr />
      </div>
      <div className="flex gap-2 items-center">
        {/* product list */}
        {products.map((product:TProduct, index:number) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
