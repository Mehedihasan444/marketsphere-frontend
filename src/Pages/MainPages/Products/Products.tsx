import { useEffect, useState } from "react";
import Filters from "./FilterSideber/FilterSideber";
import ProductCard from "../../../Components/Shared/ProductCard";
import { Alert, Pagination, Select, Spin } from "antd";
import { useGetProductsQuery } from "../../../Redux/Features/Product/productApi";
import { TProduct } from "../../../Interface";
import { useLocation } from "react-router-dom";

const Products = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("");
  
  const { data = {}, isLoading, error } = useGetProductsQuery({ 
    brand, 
    category,
    sortOrder, 
    page: currentPage, 
    limit, 
    searchTerm,
    sortBy
    // TODO: Add minPrice and maxPrice to API query when backend supports it
    // minPrice: priceRange[0],
    // maxPrice: priceRange[1]
  });
  
  const { data: products, meta } = data?.data || {};
  const { total } = meta || {};
  
  // Filter products by price range on the frontend until backend supports it
  const filteredProducts = products?.filter((product: TProduct) => 
    product.price >= priceRange[0] && product.price <= priceRange[1]
  ) || [];
  
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
      <Alert
        message="Error"
        description="Failed to load products."
        type="error"
        showIcon
      />
    );
  }
  const handlePageChange=( page: number )=> {
    setCurrentPage(page);
    setSearchTerm(searchTerm);
    setSortBy("price")
  }

  const handleClearFilters = () => {
    setPriceRange([0, 10000]);
    setBrand("");
    setCategory("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <Filters 
            setBrand={setBrand}  
            setCategory={setCategory}
            setPriceRange={setPriceRange}
            brand={brand}
            category={category}
            priceRange={priceRange}
            onClearFilters={handleClearFilters}
          />
          
          {/* Main Content */}
          <div className="flex-1 relative">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              {/* Header */}
              <div className="flex justify-between items-center gap-4 p-4 border-b border-gray-200">
                <div className="font-semibold text-gray-900">
                  Products ({filteredProducts.length})
                </div>
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
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[70vh]">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product: TProduct, index: number) => (
                      <div key={index}>
                        <ProductCard product={product} />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-3 flex justify-center items-center py-12">
                      <p className="text-gray-500">No products found.</p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-end">
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
        </div>
      </div>
    </div>
  );
};

export default Products;
