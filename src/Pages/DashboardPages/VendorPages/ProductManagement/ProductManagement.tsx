import { useState } from "react";
import { Table, Button, Modal, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../../Redux/Features/Product/productApi";
import ProductModal from "./ProductModal";

const ProductManagement = () => {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { data: products, isLoading } = useGetProductsQuery({
    brand,
    category,
    page,
    limit,
  }); // Fetch all products

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
      render: (_: any, record: any) => (
        <>
          <Button
            icon={<EditOutlined />}
            style={{ marginRight: 8 }}
            onClick={() => openModal(record)}
          >
            <ProductModal initialData={editingProduct} />
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center gap-5">
        <h2>Manage Products</h2>

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
