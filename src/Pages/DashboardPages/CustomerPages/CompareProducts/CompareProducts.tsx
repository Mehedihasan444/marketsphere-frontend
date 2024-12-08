// ! have to implement this page
import React, { useState } from "react";
import { Card, Button, Table, Select } from "antd";

const { Option } = Select;

const mockProducts = [
  {
    id: "1",
    name: "Product A",
    price: 100,
    brand: "Brand A",
    rating: 4.5,
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
  {
    id: "2",
    name: "Product B",
    price: 120,
    brand: "Brand B",
    rating: 4.0,
    features: ["Feature 1", "Feature 4", "Feature 5"],
  },
  {
    id: "3",
    name: "Product C",
    price: 90,
    brand: "Brand C",
    rating: 4.7,
    features: ["Feature 2", "Feature 3", "Feature 6"],
  },
];

const CompareProducts: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleAddProduct = (productId: string) => {
    if (selectedProducts.length >= 3) {
      return alert("You can compare up to 3 products.");
    }
    if (!selectedProducts.includes(productId)) {
      setSelectedProducts((prev) => [...prev, productId]);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((id) => id !== productId));
  };

  const comparedProducts = mockProducts.filter((product) =>
    selectedProducts.includes(product.id)
  );

  const renderComparisonTable = () => {
    const dataSource = comparedProducts.map((product) => ({
      key: product.id,
      name: product.name,
      price: `$${product.price}`,
      brand: product.brand,
      rating: product.rating,
      features: product.features.join(", "),
    }));

    const columns = [
      {
        title: "Feature",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Brand",
        dataIndex: "brand",
        key: "brand",
      },
      {
        title: "Rating",
        dataIndex: "rating",
        key: "rating",
      },
      {
        title: "Features",
        dataIndex: "features",
        key: "features",
      },
    ];

    return <Table dataSource={dataSource} columns={columns} pagination={false} />;
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Compare Products</h2>
      <div className="mb-4">
        <Select
          placeholder="Select a product to compare"
          style={{ width: "100%" }}
          onChange={handleAddProduct}
        >
          {mockProducts.map((product) => (
            <Option key={product.id} value={product.id}>
              {product.name}
            </Option>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {comparedProducts.map((product) => (
          <Card
            key={product.id}
            title={product.name}
            extra={
              <Button type="link" onClick={() => handleRemoveProduct(product.id)}>
                Remove
              </Button>
            }
          >
            <p>Price: ${product.price}</p>
            <p>Brand: {product.brand}</p>
            <p>Rating: {product.rating} ⭐</p>
            <p>Features: {product.features.join(", ")}</p>
          </Card>
        ))}
      </div>
      {comparedProducts.length > 0 && renderComparisonTable()}
      {comparedProducts.length === 0 && (
        <p className="text-center text-gray-500">Select products to compare.</p>
      )}
    </div>
  );
};

export default CompareProducts;
