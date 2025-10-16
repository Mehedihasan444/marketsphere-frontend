import ProductCard from "../../../../Components/Shared/ProductCard";
import { TProduct } from "../../../../Interface";

const TopSellingProducts = ({products}:{products:TProduct[]}) => {
    
        return (
            <div className="bg-white p-4 mt-4">
            {/* filter */}
          <div className="py-4">
            <h2 className="text-xl font-semibold pb-2">Top Selling </h2>
            <hr />
            </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4  items-center">
            {/* product list */}
            {products.map((product:TProduct, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
        );
    };


export default TopSellingProducts;