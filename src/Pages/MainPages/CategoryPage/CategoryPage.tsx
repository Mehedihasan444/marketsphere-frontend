import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, Select, Slider, Checkbox, Button, Empty, Spin } from 'antd';
import { 
  HomeOutlined, 
  AppstoreOutlined, 
  BarsOutlined,
  FilterOutlined
} from '@ant-design/icons';
import ProductCard from '../../../Components/Shared/ProductCard';
import { TProduct, ShopStatus } from '../../../Interface';

const { Option } = Select;

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isLoading] = useState(false);

  // Format category name for display
  const formatCategoryName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const displayName = categoryName ? formatCategoryName(categoryName) : 'Category';

  // Mock data - Replace with actual API call using useGetProductsQuery
  const products: TProduct[] = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      description: 'Latest iPhone with advanced features',
      price: 1199,
      images: ['https://via.placeholder.com/300'],
      discount: 10,
      quantity: 50,
      rating: 4.8,
      categoryId: 'cat1',
      category: { 
        id: 'cat1', 
        name: 'Mobile Phones', 
        description: '', 
        createdAt: new Date(), 
        updatedAt: new Date(), 
        isDeleted: false,
        products: []
      },
      shopId: 'shop1',
      shop: { 
        id: 'shop1',
        name: 'Apple Store', 
        logo: 'https://via.placeholder.com/50',
        banner: '',
        description: '',
        status: ShopStatus.ACTIVE,
        isActive: true,
        vendorId: 'v1',
        vendor: null as unknown as never,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        products: [],
        followers: [],
        reviews: [],
        order: [],
        coupon: []
      },
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      cartItems: [],
      orderItems: [],
      reviews: null as unknown as never,
      wishlistItem: []
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Premium Samsung flagship phone',
      price: 1099,
      images: ['https://via.placeholder.com/300'],
      discount: 15,
      quantity: 30,
      rating: 4.7,
      categoryId: 'cat1',
      category: { 
        id: 'cat1', 
        name: 'Mobile Phones', 
        description: '', 
        createdAt: new Date(), 
        updatedAt: new Date(), 
        isDeleted: false,
        products: []
      },
      shopId: 'shop2',
      shop: { 
        id: 'shop2',
        name: 'Samsung Store', 
        logo: 'https://via.placeholder.com/50',
        banner: '',
        description: '',
        status: ShopStatus.ACTIVE,
        isActive: true,
        vendorId: 'v2',
        vendor: null as unknown as never,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        products: [],
        followers: [],
        reviews: [],
        order: [],
        coupon: []
      },
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      cartItems: [],
      orderItems: [],
      reviews: null as unknown as never,
      wishlistItem: []
    },
  ];

  const brands = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Oppo'];

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
                {products.length} products found
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
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
                  min={0}
                  max={10000}
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
                  {brands.map((brand) => (
                    <div key={brand}>
                      <Checkbox
                        checked={selectedBrands.includes(brand)}
                        onChange={(e) => handleBrandChange(brand, e.target.checked)}
                      >
                        {brand}
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
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Spin size="large" />
              </div>
            ) : products.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {products.map((product) => (
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

            {/* Load More */}
            {products.length > 0 && (
              <div className="mt-8 text-center">
                <Button type="primary" size="large">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
