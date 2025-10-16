import ProductCard from "../../../../Components/Shared/ProductCard";
import { TProduct } from "../../../../Interface";

const AllProducts = ({ products }: { products: TProduct[] }) => {
  
  return (
    <div className="bg-white mt-4 p-4">
      <div className="py-4">
        <h2 className="text-xl font-semibold pb-2">All Products </h2>
        <hr />
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products?.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
