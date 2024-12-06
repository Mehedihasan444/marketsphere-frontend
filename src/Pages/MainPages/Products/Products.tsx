import { useState } from "react";
import Filters from "./FilterSideber/FilterSideber";
import ProductCard from "../../../Components/Shared/ProductCard";
import { Select } from "antd";

const Products = () => {
  const [filters, setFilters] = useState({
    priceRange: [0, 500000],
    categories: [],
  });

  const allProducts = [
    {
      id: "1",
      name: "Smartphone Pro Max",
      description:
        "Latest Pro Max smartphone with cutting-edge technology and exceptional performance.",
      price: 999.99,
      images: [
        "https://demo-uminex.myshopify.com/cdn/shop/products/products_9_2.jpg?v=1670907530&width=360",
        "https://example.com/images/smartphone1-side.jpg",
      ],
      discount: 10.0,
      quantity: 100,
      categoryId: "cat1",
      flashSaleId: "sale1",
      shopId: "shop1",
      rating: 4.5,

      isDeleted: false,
      createdAt: "2024-12-06T00:00:00.000Z",
      updatedAt: "2024-12-06T00:00:00.000Z",
    },
    {
      id: "2",
      name: "Gaming Laptop X9",
      description:
        "High-performance gaming laptop designed for immersive gaming experiences.",
      price: 1499.99,
      images: [
        "https://demo-uminex.myshopify.com/cdn/shop/products/products_19_2.jpg?v=1672303733&width=360",
        "https://example.com/images/laptop1-open.jpg",
      ],
      discount: 15.0,
      quantity: 50,
      categoryId: "cat2",
      flashSaleId: "sale2",
      shopId: "shop2",
      rating: 5,
      isDeleted: false,
      createdAt: "2024-12-06T00:00:00.000Z",
      updatedAt: "2024-12-06T00:00:00.000Z",
    },
    {
      id: "3",
      name: "Noise-Cancelling Headphones",
      description:
        "Premium over-ear headphones with active noise cancellation and superior sound quality.",
      price: 299.99,
      images: [
        "https://demo-uminex.myshopify.com/cdn/shop/products/products_23_2.jpg?v=1672305892&width=360",
        "https://example.com/images/headphones1-side.jpg",
      ],
      discount: 5.0,
      quantity: 200,
      categoryId: "cat3",
      flashSaleId: "sale3",
      shopId: "shop3",
      rating: 4.5,
      isDeleted: false,
      createdAt: "2024-12-06T00:00:00.000Z",
      updatedAt: "2024-12-06T00:00:00.000Z",
    },
    {
      id: "4",
      name: "4K Drone Camera",
      description:
        "Compact drone with 4K UHD camera for stunning aerial photography.",
      price: 599.99,
      images: [
        "https://demo-uminex.myshopify.com/cdn/shop/products/products_23_2.jpg?v=1672305892&width=360",
        "https://example.com/images/drone1-flight.jpg",
      ],
      discount: 20.0,
      quantity: 0,
      categoryId: "cat4",
      flashSaleId: "sale4",
      shopId: "shop4",
      rating: 4,
      isDeleted: false,
      createdAt: "2024-12-06T00:00:00.000Z",
      updatedAt: "2024-12-06T00:00:00.000Z",
    },
    {
      id: "5",
      name: "VR Headset Ultimate",
      description:
        "Experience next-level virtual reality gaming with this lightweight and immersive VR headset.",
      price: 399.99,
      images: [
        "https://demo-uminex.myshopify.com/cdn/shop/products/products_23_2.jpg?v=1672305892&width=360",
        "https://example.com/images/vr1-side.jpg",
      ],
      discount: 12.0,
      quantity: 120,
      categoryId: "cat5",
      flashSaleId: "sale5",
      shopId: "shop5",
      rating: 4.5,
      isDeleted: false,
      createdAt: "2024-12-06T00:00:00.000Z",
      updatedAt: "2024-12-06T00:00:00.000Z",
    },
  ];
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  // Filter Logic
  const filteredProducts = allProducts.filter(
    (product) =>
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1] &&
      (filters.categories.length === 0 ||
        filters.categories.includes(product.category))
  );

  return (
    <div className="bg-neutral-100 ">
      <div className="flex p-6 space-x-4 max-w-8xl mx-auto lg:mx-16">
        {/* Filters Sidebar */}
        <aside className="w-1/4">
          <Filters filters={filters} setFilters={setFilters} />
        </aside>
        <div className="flex-1">
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
          <div className="grid grid-cols-4 gap-6 ">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))
            ) : (
              <p className="text-gray-500 col-span-3">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
