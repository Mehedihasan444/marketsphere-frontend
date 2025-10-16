import { useEffect, useState } from "react";
import Filters from "./FilterSideber/FilterSideber";
import ProductCard from "../../../Components/Shared/ProductCard";
import { Alert, Pagination, Select, Spin } from "antd";
import { useGetProductsQuery } from "../../../Redux/Features/Product/productApi";
import { TProduct } from "../../../Interface";
import { useLocation } from "react-router-dom";

const FlashSale = () => {
  // const [filters, setFilters] = useState<{
  //   priceRange: [number, number];
  //   categories: string[];
  // }>({
  //   priceRange: [0, 500000],
  //   categories: [],
  // });
 
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("");
//    const { data = {}, isLoading, error } = useGetFlashSaleProductsQuery("");
//     const products = data?.data || [];
  const { data = {}, isLoading, error } = useGetProductsQuery({ brand, category,sortOrder, page:currentPage, limit, searchTerm,sortBy });
  const { data: products, meta } = data?.data || {};
  const { total } = meta || {};
  
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('searchTerm');
    const filterBycategory = params.get('category');
    if (search) {
      setSearchTerm(search);
    }
    if(filterBycategory){
      setCategory(filterBycategory);
    }
  }, [location.search]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spin tip="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Alert
          message="Error"
          description="Failed to load products."
          type="error"
          showIcon
        />
      </div>
    );
  }
  const handlePageChange=( page: number )=> {
    setCurrentPage(page);
    setSearchTerm(searchTerm);
    setSortBy("price")
  }
  return (
    <div className="max-w-7xl mx-auto bg-neutral-100 min-h-screen">
      <div className="flex  space-x-4  ">
        {/* Filters Sidebar */}
        <aside className="w-1/4 ">
          <Filters setBrand={setBrand}  setCategory={setCategory}/>
        </aside>
        <div className="flex-1 pb-4">
          <div className="flex justify-between items-center gap-4 bg-white p-4 mb-4 w-full">
            <div className="font-semibold">🔥 Flash Sale Products</div>
            <div className="flex gap-4">
              <div className="flex gap-2 items-center">
                <span className="font-semibold text-neutral-600">Shows:</span>
                <Select
                  defaultValue="20"
                  style={{ width: 120 }}
                  onChange={(value) => setLimit(Number(value))}
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
                  onChange={(value) => setSortOrder(value)}
                  options={[
                    { value: " ", label: "Default" },
                    { value: "desc", label: "Price (High > Low)" },
                    { value: "asc", label: "Price (Low > High)" },
                  ]}
                />
              </div>
            </div>
          </div>
          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4  min-h-[70vh]">
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

         {/* Pagination */}
                 <div className="mt-4 flex justify-end">
                   <Pagination
                     current={currentPage}
                     total={total}
                     pageSize={limit}
                     onChange={handlePageChange}
                     showSizeChanger={false}
                   />
                 </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
