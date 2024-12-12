import { useState } from "react";
import Filters from "./FilterSideber/FilterSideber";
import ProductCard from "../../../Components/Shared/ProductCard";
import { Alert, Pagination, Select, Spin } from "antd";
import { useGetProductsQuery } from "../../../Redux/Features/Product/productApi";
import { TProduct } from "../../../Interface";

const Products = () => {
  const [filters, setFilters] = useState({
    priceRange: [0, 500000],
    categories: [],
  });
  const { data = {}, isLoading, error } = useGetProductsQuery({ brand: "", category: "", page: 1, limit: 10, searchTerm: "" });
  const { data: products, meta } = data?.data || {};
  const { total, page } = meta || {};


  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  // // Filter Logic
  // const filteredProducts = products.filter(
  //   (product:TProduct) =>
  //     product.price >= filters.priceRange[0] &&
  //     product.price <= filters.priceRange[1] &&
  //     (filters.categories.length === 0 ||
  //       filters.categories.includes(product.category as string))
  // );
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
    <div className="max-w-8xl mx-auto bg-neutral-100 min-h-screen">
      <div className="flex  space-x-4  lg:mx-16">
        {/* Filters Sidebar */}
        <aside className="w-1/4 ">
          <Filters filters={filters} setFilters={setFilters} />
        </aside>
        <div className="flex-1 pb-4">
          <div className="flex justify-between items-center gap-4 bg-white p-4 mb-4 w-full">
            <div className="font-semibold">SearchTerm</div>
            <div className="flex gap-4">
              <div className="flex gap-2 items-center">
                <span className="font-semibold text-neutral-600">Shows:</span>
                <Select
                  defaultValue="20"
                  style={{ width: 120 }}
                  onChange={handleChange}
                  options={[
                    { value: 20, label: "20" },
                    { value: 30, label: "30" },
                    { value: 40, label: "40" },
                  ]}
                />
              </div>
              <div className="flex gap-2 items-center">
                <span className="font-semibold text-neutral-600">Sort By:</span>
                <Select
                  defaultValue="Default"
                  style={{ width: 120 }}
                  onChange={handleChange}
                  options={[
                    { value: " ", label: "Default" },
                    { value: "-price", label: "Price (High > Low)" },
                    { value: "price", label: "Price (Low > High)" },
                  ]}
                />
              </div>
            </div>
          </div>
          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4  min-h-[70vh]">
            {products.length > 0 ? (
              products.map((product: TProduct, index: number) => (
                <div className="" key={index} >
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-3">No products found.</p>
            )}
          </div>

          {/* pagination */}
          <Pagination  align="end" defaultCurrent={page} total={total} className="mt-auto" 
        onChange={(page) => {
          // Update the query with the new page number
          // Assuming you have a function to update the query parameters
          updateQueryParams({ page });
        }}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
