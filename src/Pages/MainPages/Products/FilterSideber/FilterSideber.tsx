import { Slider, Select, Checkbox, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { TCategory } from "../../../../Interface";
import { useGetAllCategoriesQuery } from "../../../../Redux/Features/Category/categoryApi";
import { useGetProductsQuery } from "../../../../Redux/Features/Product/productApi";
import { useMemo } from "react";

interface FiltersProps {
  setBrand: (value: string) => void;
  setCategory: (value: string) => void;
  setPriceRange?: (value: [number, number]) => void;
  brand?: string;
  category?: string;
  priceRange?: [number, number];
  onClearFilters?: () => void;
}

const Filters = ({ 
  setBrand, 
  setCategory, 
  setPriceRange,
  brand,
  category,
  priceRange = [0, 10000],
  onClearFilters
}: FiltersProps) => {
  // Fetch categories using the custom hook
  const { data: categoriesData } = useGetAllCategoriesQuery({ page: 1, limit: 100 });

  // Fetch products to extract brands dynamically
  const { data: productsData } = useGetProductsQuery({ limit: 1000 });

  // Safely access the categories data with correct path
  const categories = categoriesData?.data?.data || [];

  // Common brands as fallback (if no products data is available)
  const fallbackBrands = [
    "Apple",
    "Samsung",
    "Dell",
    "HP",
    "Lenovo",
    "Asus",
    "Acer",
    "Sony",
    "LG",
    "Microsoft",
    "Google",
    "OnePlus",
    "Xiaomi",
    "Oppo",
    "Vivo",
    "Realme",
    "Nokia",
    "Motorola",
    "Huawei",
    "Canon",
    "Nikon",
    "Panasonic",
    "JBL",
    "Bose",
    "Beats",
    "Sennheiser",
    "LEGO",
    "Hasbro",
    "Zara",
    "H&M",
    "IKEA",
    "Wooden Street",
    "Arrow",
    "Levi's",
    "FitLife",
    "Bowflex",
    "O'Reilly"
  ].sort();

  // Extract unique brands from products data
  const dynamicBrands = useMemo(() => {
    const products = productsData?.data?.data || [];
    if (products.length === 0) return null;
    
    const brandsSet = new Set<string>();
    products.forEach((product: { brand?: string }) => {
      if (product.brand && product.brand.trim() !== '') {
        brandsSet.add(product.brand);
      }
    });
    
    return Array.from(brandsSet).sort();
  }, [productsData]);

  // Use dynamic brands if available, otherwise use fallback
  const availableBrands = dynamicBrands || fallbackBrands;

  const handleBrandChange = (brandName: string, checked: boolean) => {
    if (checked) {
      setBrand(brandName);
    } else {
      setBrand("");
    }
  };

  return (
    <div className="w-64 flex-shrink-0">
      <div className="bg-white rounded-lg border border-gray-200 sticky top-4">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <FilterOutlined />
            Filters
          </h3>
        </div>

        {/* Price Range */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Price Range</h4>
          <Slider
            range
            min={0}
            max={10000}
            step={100}
            value={priceRange}
            onChange={(value) => {
              if (setPriceRange && Array.isArray(value) && value.length === 2) {
                setPriceRange([value[0], value[1]]);
              }
            }}
            tooltip={{
              formatter: (value) => `৳${value?.toLocaleString() || 0}`,
            }}
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Categories */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Categories</h4>
          <Select
            style={{ width: "100%" }}
            placeholder="All Categories"
            value={category || undefined}
            onChange={(value) => setCategory(value)}
            allowClear
            showSearch
            filterOption={(input, option) =>
              String(option?.children || '').toLowerCase().includes(input.toLowerCase())
            }
          >
            {Array.isArray(categories) && categories.map((cat: TCategory) => (
              <Select.Option key={cat.id} value={cat.name}>
                {cat.name}
              </Select.Option>
            ))}
          </Select>
        </div>

        {/* Brands */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Brands</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {availableBrands.slice(0, 15).map((brandName) => (
              <div key={brandName}>
                <Checkbox
                  checked={brand === brandName}
                  onChange={(e) => handleBrandChange(brandName, e.target.checked)}
                >
                  {brandName}
                </Checkbox>
              </div>
            ))}
          </div>
        </div>

        {/* Ratings */}
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Ratings</h4>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2 cursor-pointer hover:text-[#1890ff]">
                <span className="text-yellow-400">{'★'.repeat(rating)}</span>
                <span className="text-gray-400">{'★'.repeat(5 - rating)}</span>
                <span className="text-sm text-gray-600">& Up</span>
              </div>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <div className="p-4">
          <Button 
            type="default" 
            block
            onClick={() => {
              if (onClearFilters) {
                onClearFilters();
              }
            }}
          >
            Clear All Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
