import { useState, useMemo } from 'react';
import { Input, Breadcrumb, Tag, Spin } from 'antd';
import {
  SearchOutlined,
  HomeOutlined,
  ApiOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useGetAllCategoriesQuery } from '../../../Redux/Features/Category/categoryApi';


interface Category {
  id: string;
  name: string;
  parentId: string | null;
  image?: string;
  description?: string;
  _count?: {
    products: number;
  };
}

const AllCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: categoriesData, isLoading } = useGetAllCategoriesQuery({ limit: 100 });
  // Extract and process categories
  const allCategories = useMemo(() => categoriesData?.data?.data || [], [categoriesData]);


  const parentCategories = useMemo(() =>
    Array.isArray(allCategories)
      ? allCategories.filter((cat: Category) => !cat.parentId)
      : []
    , [allCategories]);

  // Helper function to convert category name to slug
  const categoryToSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  // Map categories with their children
  const categoryData = useMemo(() =>
    parentCategories.map((parent: Category) => {
      const children = Array.isArray(allCategories)
        ? allCategories.filter((cat: Category) => cat.parentId === parent.id)
        : [];

      const productCount = parent._count?.products || 0;
      const childrenProductCount = children.reduce((sum: number, child: Category) =>
        sum + (child._count?.products || 0), 0
      );

      return {
        id: parent.id,
        name: parent.name,
        icon: <ApiOutlined />,
        count: productCount + childrenProductCount,
        color: "blue",
        image: parent.image,
        subcategories: children.map((child: Category) => ({
          id: child.id,
          name: child.name,
          slug: categoryToSlug(child.name),
          count: child._count?.products || 0
        })),
        slug: categoryToSlug(parent.name),
      };
    })
    , [parentCategories, allCategories]);

  const filteredCategories = categoryData.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subcategories.some(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalProducts = categoryData.reduce((sum, cat) => sum + cat.count, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spin size="large" tip="Loading categories..." />
      </div>
    );
  }

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
                title: 'All Categories',
              },
            ]}
          />
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Browse All Categories
            </h1>
            <p className="text-gray-600 text-lg">
              Explore our wide range of products across {categoryData.length} categories
            </p>
            <div className="mt-2">
              <Tag color="blue" className="text-sm px-3 py-1">
                {totalProducts.toLocaleString()} Products Available
              </Tag>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <Input
              size="large"
              placeholder="Search categories..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg border border-gray-200 hover:border-[#1890ff] hover:shadow-lg transition-all duration-300 h-full group"
              >
                {/* Category Header - Clickable */}
                <Link to={`/category/${category.slug}`} className="block p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center justify-center text-2xl text-[#1890ff] group-hover:text-white transition-colors">
                      <img src={category.image} alt={category.name} className="rounded-full w-28 h-28" />
                    </div>
                    <Tag color={category.color} className="text-xs">
                      {category.count} items
                    </Tag>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#1890ff] transition-colors">
                    {category.name}
                  </h3>
                </Link>

                {/* Subcategories - Each clickable */}
                <div className="p-6">
                  <ul className="space-y-2">
                    {category.subcategories.map((sub) => (
                      <li key={sub.id}>
                        <Link
                          to={`/category/${sub.slug}`}
                          className="text-sm text-gray-600 hover:text-[#1890ff] transition-colors flex items-center gap-2 group/sub"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="w-1 h-1 rounded-full bg-gray-400 group-hover/sub:bg-[#1890ff]"></span>
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* View All Link */}
                <div className="px-6 pb-6">
                  <Link
                    to={`/category/${category.slug}`}
                    className="text-sm text-[#1890ff] font-medium hover:underline flex items-center gap-1"
                  >
                    View All
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No categories found
            </h3>
            <p className="text-gray-600">
              Try searching with different keywords
            </p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#1890ff] mb-2">
                {categoryData.length}+
              </div>
              <div className="text-gray-600">Product Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1890ff] mb-2">
                {totalProducts.toLocaleString()}+
              </div>
              <div className="text-gray-600">Total Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1890ff] mb-2">
                100%
              </div>
              <div className="text-gray-600">Quality Guaranteed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategories;
