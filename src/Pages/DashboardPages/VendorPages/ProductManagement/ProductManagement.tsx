/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../../Redux/Features/Product/productApi";
import ProductModal from "./ProductModal";
import { TProduct } from "../../../../Interface";

const ProductManagement = () => {
  const [brand, setBrand] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { data = {}, isLoading } = useGetProductsQuery({
    brand,
    category,
    page,
    limit,
    searchTerm,
  }); // Fetch all products
  const { data: products ,meta} = data?.data || {};
  const { total } = meta || {};
  const [deleteProduct] = useDeleteProductMutation(); // Mutation for deleting products

  // Delete product handler
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteProduct(id).unwrap();
      if (response.success) {
        message.success("Product deleted successfully!");
      } else {
        message.error("Failed to delete product.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while deleting the product.");
    }
  };

  // Columns for the table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true, // Shorten long text
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`, // Format price
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Category",
      dataIndex: ["category", "name"], // Assuming category has a `name` property
      key: "category",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: TProduct) => (
        <div className="sm:flex justify-between items-center gap-2 ">
          <ProductModal key={`edit-${record.id}`} initialData={record} />

          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="primary" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
          <h2 className="text-2xl font-semibold">Manage Products</h2>
      <div className="flex justify-between items-center gap-5 my-4">
        {/* Total Count */}
        <div className="">
          Total products: <strong>{total || 0}</strong>
        </div>
        <ProductModal initialData={null} />
      </div>
      <Table
        columns={columns}
        dataSource={products?.map((product: any) => ({
          ...product,
          key: product.id,
        }))}
        loading={isLoading}
        bordered
      />
    </div>
  );
};

export default ProductManagement;
