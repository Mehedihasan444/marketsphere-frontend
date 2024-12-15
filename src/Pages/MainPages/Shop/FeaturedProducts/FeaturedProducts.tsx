import ProductCard from "../../../../Components/Shared/ProductCard";
import { TProduct } from "../../../../Interface";

const FeaturedProducts = ({products}:{products:TProduct[]}) => {

  return (
    <div className="bg-white  p-4 mt-4">
      {/* filter */}
      <div className="py-4">
        <h2 className="text-xl font-semibold pb-2">Featured </h2>
        <hr />
      </div>
      <div className="flex gap-2 items-center">
        {/* product list */}
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
