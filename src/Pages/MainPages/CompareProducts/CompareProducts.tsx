
import React, { useState, useEffect } from "react";
import { Card, Button, Empty, Alert, Tooltip, Badge, Spin } from "antd";
import { DeleteOutlined, SwapOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import SearchInput from "./SearchInput";
import { useGetProductByIdQuery } from "../../../Redux/Features/Product/productApi";
import { useParams, useNavigate } from "react-router-dom";
import DynamicBreadcrumb from "../../../Components/Shared/DynamicBreadcrumb";
import { HomeOutlined, ProductFilled } from "@ant-design/icons";

const CompareProducts: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // States for product IDs
  const [leftProductId, setLeftProductId] = useState<string | null>(id || null);
  const [rightProductId, setRightProductId] = useState<string | null>(null);
  const [thirdProductId, setThirdProductId] = useState<string | null>(null);
  const [categoryMismatch, setCategoryMismatch] = useState<boolean>(false);

  // Fetch product data
  const { data: leftData, isLoading: leftLoading } = useGetProductByIdQuery(leftProductId as string, {
    skip: !leftProductId,
  });
  const { data: rightData, isLoading: rightLoading } = useGetProductByIdQuery(rightProductId as string, {
    skip: !rightProductId,
  });
  const { data: thirdData, isLoading: thirdLoading } = useGetProductByIdQuery(thirdProductId as string, {
    skip: !thirdProductId,
  });

  // Extract product data
  const leftProduct = leftData?.data;
  const rightProduct = rightData?.data;
  const thirdProduct = thirdData?.data;

  // Check if products are from the same category
  useEffect(() => {
    if (leftProduct && rightProduct && leftProduct.category?.id !== rightProduct.category?.id) {
      setCategoryMismatch(true);
    } else if (leftProduct && thirdProduct && leftProduct.category?.id !== thirdProduct.category?.id) {
      setCategoryMismatch(true);
    } else if (rightProduct && thirdProduct && rightProduct.category?.id !== thirdProduct.category?.id) {
      setCategoryMismatch(true);
    } else {
      setCategoryMismatch(false);
    }
  }, [leftProduct, rightProduct, thirdProduct]);

  const handleRemoveProduct = (side: "left" | "right" | "third") => {
    if (side === "left") setLeftProductId(null);
    if (side === "right") setRightProductId(null);
    if (side === "third") setThirdProductId(null);
  };

  // Swap products
  const handleSwapProducts = (first: "left" | "right" | "third", second: "left" | "right" | "third") => {
    if (first === "left" && second === "right") {
      const temp = leftProductId;
      setLeftProductId(rightProductId);
      setRightProductId(temp);
    } else if (first === "left" && second === "third") {
      const temp = leftProductId;
      setLeftProductId(thirdProductId);
      setThirdProductId(temp);
    } else if (first === "right" && second === "third") {
      const temp = rightProductId;
      setRightProductId(thirdProductId);
      setThirdProductId(temp);
    }
  };

  // Breadcrumb items
  const breadcrumbItems = [
    {
      href: "/",
      title: <HomeOutlined />,
    },
    {
      href: "/products",
      title: (
        <>
          <ProductFilled />
          <span>Products</span>
        </>
      ),
    },
    {
      title: "Compare Products",
    },
  ];

  // Loading state
  const isLoading = leftLoading || rightLoading || thirdLoading;

  return (
    <div className=" min-h-screen py-6">
      <div className="max-w-7xl  mx-auto">
        <DynamicBreadcrumb items={breadcrumbItems} />

        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Product Comparison</h2>
            <p className="text-gray-600">Compare up to 3 products to find the best match for your needs</p>
          </div>

          {categoryMismatch && (
            <Alert
              message="Category Mismatch"
              description="For accurate comparison, please select products from the same category."
              type="warning"
              showIcon
              className="mb-6"
              closable
            />
          )}

          {/* Search Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Left Product Input */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">Product 1</h3>
              <SearchInput onProductSelect={(id) => setLeftProductId(id)} />
              {isLoading ? (
                <div className="flex justify-center items-center h-48 mt-4">
                  <Spin />
                </div>
              ) : leftProduct ? (
                <div className="mt-4">
                  <Card
                    hoverable
                    className="overflow-hidden"
                    cover={
                      <div className="h-48 overflow-hidden">
                        <img
                          src={leftProduct.images[0]}
                          alt={leftProduct.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    }
                    actions={[
                      <Tooltip title="Remove">
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleRemoveProduct("left")}
                        />
                      </Tooltip>,
                      <Tooltip title="Swap with Product 2">
                        <Button
                          type="text"
                          icon={<SwapOutlined />}
                          onClick={() => handleSwapProducts("left", "right")}
                          disabled={!rightProduct}
                        />
                      </Tooltip>,
                      <Tooltip title="Swap with Product 3">
                        <Button
                          type="text"
                          icon={<SwapOutlined />}
                          onClick={() => handleSwapProducts("left", "third")}
                          disabled={!thirdProduct}
                        />
                      </Tooltip>,
                    ]}
                  >
                    <Card.Meta
                      title={
                        <Tooltip title={leftProduct.name}>
                          <div className="truncate font-bold">{leftProduct.name}</div>
                        </Tooltip>
                      }
                      description={
                        <div>
                          <div className="text-blue-600 font-semibold">${leftProduct.price}</div>
                          <div className="flex items-center mt-1">
                            <Badge status="processing" color={leftProduct.quantity > 0 ? "green" : "red"} />
                            <span className="text-xs ml-1">
                              {leftProduct.quantity > 0 ? "In Stock" : "Out of Stock"}
                            </span>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </div>
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No product selected"
                  className="mt-4 p-8 bg-gray-100 rounded-lg"
                />
              )}
            </div>

            {/* Right Product Input */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">Product 2</h3>
              <SearchInput onProductSelect={(id) => setRightProductId(id)} />
              {isLoading ? (
                <div className="flex justify-center items-center h-48 mt-4">
                  <Spin />
                </div>
              ) : rightProduct ? (
                <div className="mt-4">
                  <Card
                    hoverable
                    className="overflow-hidden"
                    cover={
                      <div className="h-48 overflow-hidden">
                        <img
                          src={rightProduct.images[0]}
                          alt={rightProduct.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    }
                    actions={[
                      <Tooltip title="Remove">
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleRemoveProduct("right")}
                        />
                      </Tooltip>,
                      <Tooltip title="Swap with Product 1">
                        <Button
                          type="text"
                          icon={<SwapOutlined />}
                          onClick={() => handleSwapProducts("left", "right")}
                          disabled={!leftProduct}
                        />
                      </Tooltip>,
                      <Tooltip title="Swap with Product 3">
                        <Button
                          type="text"
                          icon={<SwapOutlined />}
                          onClick={() => handleSwapProducts("right", "third")}
                          disabled={!thirdProduct}
                        />
                      </Tooltip>,
                    ]}
                  >
                    <Card.Meta
                      title={
                        <Tooltip title={rightProduct.name}>
                          <div className="truncate font-bold">{rightProduct.name}</div>
                        </Tooltip>
                      }
                      description={
                        <div>
                          <div className="text-blue-600 font-semibold">${rightProduct.price}</div>
                          <div className="flex items-center mt-1">
                            <Badge status="processing" color={rightProduct.quantity > 0 ? "green" : "red"} />
                            <span className="text-xs ml-1">
                              {rightProduct.quantity > 0 ? "In Stock" : "Out of Stock"}
                            </span>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </div>
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No product selected"
                  className="mt-4 p-8 bg-gray-100 rounded-lg"
                />
              )}
            </div>

            {/* Third Product Input */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-3">Product 3</h3>
              <SearchInput onProductSelect={(id) => setThirdProductId(id)} />
              {isLoading ? (
                <div className="flex justify-center items-center h-48 mt-4">
                  <Spin />
                </div>
              ) : thirdProduct ? (
                <div className="mt-4">
                  <Card
                    hoverable
                    className="overflow-hidden"
                    cover={
                      <div className="h-48 overflow-hidden">
                        <img
                          src={thirdProduct.images[0]}
                          alt={thirdProduct.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    }
                    actions={[
                      <Tooltip title="Remove">
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleRemoveProduct("third")}
                        />
                      </Tooltip>,
                      <Tooltip title="Swap with Product 1">
                        <Button
                          type="text"
                          icon={<SwapOutlined />}
                          onClick={() => handleSwapProducts("left", "third")}
                          disabled={!leftProduct}
                        />
                      </Tooltip>,
                      <Tooltip title="Swap with Product 2">
                        <Button
                          type="text"
                          icon={<SwapOutlined />}
                          onClick={() => handleSwapProducts("right", "third")}
                          disabled={!rightProduct}
                        />
                      </Tooltip>,
                    ]}
                  >
                    <Card.Meta
                      title={
                        <Tooltip title={thirdProduct.name}>
                          <div className="truncate font-bold">{thirdProduct.name}</div>
                        </Tooltip>
                      }
                      description={
                        <div>
                          <div className="text-blue-600 font-semibold">${thirdProduct.price}</div>
                          <div className="flex items-center mt-1">
                            <Badge status="processing" color={thirdProduct.quantity > 0 ? "green" : "red"} />
                            <span className="text-xs ml-1">
                              {thirdProduct.quantity > 0 ? "In Stock" : "Out of Stock"}
                            </span>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </div>
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No product selected"
                  className="mt-4 p-8 bg-gray-100 rounded-lg"
                />
              )}
            </div>
          </div>

          {/* Comparison Table */}
          {(leftProduct || rightProduct || thirdProduct) ? (
            <div className="mt-8 overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300 shadow-sm">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="border p-3 text-left font-semibold text-gray-700 w-1/4">Specifications</th>
                    <th className="border p-3 text-left font-semibold text-gray-700 w-1/4">
                      {leftProduct?.name || "Product 1"}
                    </th>
                    <th className="border p-3 text-left font-semibold text-gray-700 w-1/4">
                      {rightProduct?.name || "Product 2"}
                    </th>
                    <th className="border p-3 text-left font-semibold text-gray-700 w-1/4">
                      {thirdProduct?.name || "Product 3"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-medium bg-gray-50">Category</td>
                    <td className="border p-3">{leftProduct?.category?.name || "-"}</td>
                    <td className="border p-3">{rightProduct?.category?.name || "-"}</td>
                    <td className="border p-3">{thirdProduct?.category?.name || "-"}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-medium bg-gray-50">Price</td>
                    <td className="border p-3 text-blue-600 font-semibold">${leftProduct?.price?.toFixed(2) || "-"}</td>
                    <td className="border p-3 text-blue-600 font-semibold">${rightProduct?.price?.toFixed(2) || "-"}</td>
                    <td className="border p-3 text-blue-600 font-semibold">${thirdProduct?.price?.toFixed(2) || "-"}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-medium bg-gray-50">Rating</td>
                    <td className="border p-3">
                      {leftProduct ? (
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span>{leftProduct.rating || 0}/5</span>
                        </div>
                      ) : "-"}
                    </td>
                    <td className="border p-3">
                      {rightProduct ? (
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span>{rightProduct.rating || 0}/5</span>
                        </div>
                      ) : "-"}
                    </td>
                    <td className="border p-3">
                      {thirdProduct ? (
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span>{thirdProduct.rating || 0}/5</span>
                        </div>
                      ) : "-"}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-medium bg-gray-50">Availability</td>
                    <td className="border p-3">
                      {leftProduct ? (
                        <Badge
                          status={leftProduct.quantity > 0 ? "success" : "error"}
                          text={leftProduct.quantity > 0 ? `In Stock (${leftProduct.quantity})` : "Out of Stock"}
                        />
                      ) : "-"}
                    </td>
                    <td className="border p-3">
                      {rightProduct ? (
                        <Badge
                          status={rightProduct.quantity > 0 ? "success" : "error"}
                          text={rightProduct.quantity > 0 ? `In Stock (${rightProduct.quantity})` : "Out of Stock"}
                        />
                      ) : "-"}
                    </td>
                    <td className="border p-3">
                      {thirdProduct ? (
                        <Badge
                          status={thirdProduct.quantity > 0 ? "success" : "error"}
                          text={thirdProduct.quantity > 0 ? `In Stock (${thirdProduct.quantity})` : "Out of Stock"}
                        />
                      ) : "-"}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-medium bg-gray-50">Brand</td>
                    <td className="border p-3">{leftProduct?.brand || "-"}</td>
                    <td className="border p-3">{rightProduct?.brand || "-"}</td>
                    <td className="border p-3">{thirdProduct?.brand || "-"}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-medium bg-gray-50">Description</td>
                    <td className="border p-3 text-sm">{leftProduct?.description || "-"}</td>
                    <td className="border p-3 text-sm">{rightProduct?.description || "-"}</td>
                    <td className="border p-3 text-sm">{thirdProduct?.description || "-"}</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border p-3 font-medium bg-gray-50">Actions</td>
                    <td className="border p-3">
                      {leftProduct && (
                        <div className="flex space-x-2">
                          <Button
                            type="primary"
                            size="small"
                            icon={<ShoppingCartOutlined />}
                            onClick={() => navigate(`/products/${leftProduct.id}`)}
                          >
                            View
                          </Button>
                        </div>
                      )}
                    </td>
                    <td className="border p-3">
                      {rightProduct && (
                        <div className="flex space-x-2">
                          <Button
                            type="primary"
                            size="small"
                            icon={<ShoppingCartOutlined />}
                            onClick={() => navigate(`/products/${rightProduct.id}`)}
                          >
                            View
                          </Button>
                        </div>
                      )}
                    </td>
                    <td className="border p-3">
                      {thirdProduct && (
                        <div className="flex space-x-2">
                          <Button
                            type="primary"
                            size="small"
                            icon={<ShoppingCartOutlined />}
                            onClick={() => navigate(`/products/${thirdProduct.id}`)}
                          >
                            View
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-10 bg-gray-50 rounded-lg border border-gray-200">
              <Empty
                description={
                  <span className="text-gray-500">
                    Select at least one product to start comparing
                  </span>
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
              <Button
                type="primary"
                className="mt-4"
                onClick={() => navigate('/products')}
              >
                Browse Products
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareProducts;
