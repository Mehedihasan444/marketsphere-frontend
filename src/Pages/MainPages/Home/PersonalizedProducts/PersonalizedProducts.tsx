import { Alert, Spin } from "antd";
import ProductCard from "../../../../Components/Shared/ProductCard";
import { TProduct } from "../../../../Interface";
import { useGetPriorityBasedProductsQuery,  } from "../../../../Redux/Features/Product/productApi";

const PersonalizedProducts = () => {
  const { data = {}, isLoading, error } = useGetPriorityBasedProductsQuery("");
  const  {data:products} = data?.data || {};

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
        {/* filter */}
      <div className="py-4">
        <h2 className="text-xl font-semibold pb-2">Just For You</h2>
        <hr />
        </div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-2 items-center">
        {/* product list */}
        {products?.map((product:TProduct, index:number) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default PersonalizedProducts;
