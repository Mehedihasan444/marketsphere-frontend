import ProductCard from "../../../../Components/Shared/ProductCard";
import { TProduct } from "../../../../Interface";

const FeaturedProducts = ({ products }: { products: TProduct[] }) => {

  return (
    <div className="bg-white  p-4 mt-4">
      {/* filter */}
      <div className="py-4">
        <h2 className="text-xl font-semibold pb-2">Featured </h2>
        <hr />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4  items-center">
        {/* product list */}
        {
          products?.length === 0 && <p className="text-gray-500">No featured products found.</p>
        }
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
