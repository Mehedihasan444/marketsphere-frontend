import ProductCard from "../../../../Components/Shared/ProductCard";

const AllProducts = ({ products }) => {
  return (
    <div className="bg-white mt-4 p-4">
      <div className="py-4">
        <h2 className="text-xl font-semibold pb-2">All Products </h2>
        <hr />
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
