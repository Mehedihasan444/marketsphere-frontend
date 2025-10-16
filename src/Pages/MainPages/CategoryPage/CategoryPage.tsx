import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, Select, Slider, Checkbox, Button, Empty, Spin, Pagination } from 'antd';
import { 
  HomeOutlined, 
  AppstoreOutlined, 
  BarsOutlined,
  FilterOutlined
} from '@ant-design/icons';
import ProductCard from '../../../Components/Shared/ProductCard';
import { useGetProductsByCategorySlugQuery } from '../../../Redux/Features/Category/categoryApi';
import { TProduct } from '../../../Interface';

const { Option } = Select;

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products using the API
  const { data, isLoading, isFetching } = useGetProductsByCategorySlugQuery({
    slug: categoryName || '',
    page: currentPage,
    limit: 12,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    brand: selectedBrands.length > 0 ? selectedBrands : undefined,
    sortBy: sortBy,
  });

  // Format category name for display
  const formatCategoryName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  const displayName = categoryName ? formatCategoryName(categoryName) : 'Category';
  console.log("categoryName",displayName)
  
  const products = data?.data?.data || [];
  const meta = data?.data?.meta;
  const filters = data?.data?.filters;
  const brands = filters?.brands || [];

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Breadcrumb
            items={[
              {
                href: '/',
                title: (
                  <>
                    <HomeOutlined />
                    <span>Home</span>
                  </>
                ),
              },
              {
                href: '/categories',
                title: 'Categories',
              },
              {
                title: displayName,
              },
            ]}
          />
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{displayName}</h1>
              <p className="text-gray-600 mt-1">
                {meta?.total || 0} products found
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={` rounded ${
                    viewMode === 'grid'
                      ? ' text-[#1890ff] shadow-sm'
                      : 'text-gray-600 hover:text-[#1890ff]'
                  }`}
                >
                  <AppstoreOutlined className="text-lg" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={` rounded ${
                    viewMode === 'list'
                      ? ' text-[#1890ff] shadow-sm'
                      : 'text-gray-600 hover:text-[#1890ff]'
                  }`}
                >
                  <BarsOutlined className="text-lg" />
                </button>
              </div>
              <Select
                value={sortBy}
                onChange={setSortBy}
                style={{ width: 200 }}
                className="rounded-lg"
              >
                <Option value="popularity">Most Popular</Option>
                <Option value="price-low">Price: Low to High</Option>
                <Option value="price-high">Price: High to Low</Option>
                <Option value="rating">Highest Rated</Option>
                <Option value="newest">Newest First</Option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="hidden lg:inline-block lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 sticky top-4">
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
                  min={filters?.priceRange?.min || 0}
                  max={filters?.priceRange?.max || 10000}
                  step={100}
                  value={priceRange}
                  onChange={(value) => setPriceRange(value as [number, number])}
                  tooltip={{
                    formatter: (value) => `$${value}`,
                  }}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Brands */}
              <div className="p-4 border-b border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Brands</h4>
                <div className="space-y-3">
                  {brands && brands.length > 0 ? (
                    brands.map((brand: string) => (
                      <div key={brand}>
                        <Checkbox
                          checked={selectedBrands.includes(brand)}
                          onChange={(e) => handleBrandChange(brand, e.target.checked)}
                        >
                          {brand}
                        </Checkbox>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No brands available</p>
                  )}
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
                    setPriceRange([0, 10000]);
                    setSelectedBrands([]);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1 relative">
            {/* Loading Overlay for Refetching */}
            {isFetching && !isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-70 z-10 flex items-center justify-center rounded-lg">
                <Spin size="large" />
              </div>
            )}
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Spin size="large" />
              </div>
            ) : products.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'
                    : 'space-y-4'
                }
              >
                {products.map((product: TProduct) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12">
                <Empty
                  description={
                    <div>
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        No products found
                      </p>
                      <p className="text-gray-600 mb-4">
                        Try adjusting your filters or browse other categories
                      </p>
                      <Link to="/categories">
                        <Button type="primary">Browse Categories</Button>
                      </Link>
                    </div>
                  }
                />
              </div>
            )}

            {/* Pagination */}
            {products.length > 0 && meta && meta.total > 0 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  current={currentPage}
                  total={meta.total}
                  pageSize={12}
                  onChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} products`}
                  showSizeChanger={false}
                  className="text-center"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
