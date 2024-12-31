import React, { useState, useEffect } from "react";
import { Button, Form, Input, InputNumber, message, Modal, Select } from "antd";
import { useAddProductMutation } from "../../../../Redux/Features/Product/productApi";
import { TCategory, TProduct, TShop } from "../../../../Interface";
import { useGetAllCategoriesQuery } from "../../../../Redux/Features/Category/categoryApi";
import { useGetVendorQuery } from "../../../../Redux/Features/Vendor/vendorApi";
import { useAppSelector } from "../../../../Redux/hook";
import { FaEdit } from "react-icons/fa";

const { TextArea } = Input;
const { Option } = Select;

interface ProductModalProps {
  initialData?: TProduct | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]); // Handle multiple images
  const [form] = Form.useForm();
  const [addProduct, { isLoading }] = useAddProductMutation(); // Redux mutation hook
  const { data = {} } = useGetAllCategoriesQuery({ page: 1, limit: 10 }); // Redux query hook
  const { data: categories = [] } = data.data || {};
  const vendor = useAppSelector((state) => state.auth.user);
  // Fetch vendor all shops
  const { data: shopData = {} } = useGetVendorQuery(vendor?.email as string);

  const { shop: shops = [] } = shopData.data || {};

  // Open modal
  const showModal = () => setOpen(true);

  // Close modal
  const onClose = () => {
    setOpen(false);
    form.resetFields();
    setImageFiles([]);
  };

  // Pre-fill form when editing
  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleSubmit = async (values: {
    name: string;
    description: string;
    price: number;
    discount: number;
    quantity: number;
    rating?: number;
    categoryId: string;
    shopId: string;
    brand?: string | null;
    colors?: string[];
    sizes?: string[];
    features?: string[];
  }) => {
    const formData = new FormData();

    // Append text fields
    const data = {
      name: values.name,
      description: values.description,
      price: values.price,
      discount: values.discount,
      quantity: values.quantity,
      rating: values.rating || 0, // Default rating to 0
      categoryId: values.categoryId,
      shopId: values.shopId,
      brand: values.brand || null,
      colors: values.colors || [],
      sizes: values.sizes || [],
      features: values.features || [],
    };
    formData.append("data", JSON.stringify(data));
console.log(data)
    // Append image files
    imageFiles.forEach((file) => formData.append("images", file));

    try {
      const res = await addProduct(formData);
      if (res?.data?.success) {
        message.success(
          initialData
            ? "Product updated successfully!"
            : "Product added successfully!"
        );
        onClose(); // Close modal on success
      } else if (res?.error) {

        if ('data' in res.error) {
          // For FetchBaseQueryError, safely access the `data` property
          const errorMessage = (res.error.data as { message?: string })?.message || "Failed to add product.";
          message.error(errorMessage);
        } else if ('message' in res.error) {
          // For SerializedError, handle the `message` property
          message.error(res.error.message || "Failed to add product.");
        } else {
          // Handle unknown error types
          message.error("An unknown error occurred.");
        }
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while processing the product.");
    }
  };

  return (
    <>
      <Button type="primary" variant="outlined" onClick={showModal}>
        {initialData ? <FaEdit className="text-lg" /> : "Add Product"}
      </Button>

      <Modal
        key={initialData?.id || "add-product"}
        title={initialData ? "Edit Product" : "Add Product"}
        open={open}
        onCancel={onClose}
        footer={null} // Footer is replaced with form buttons
      >
        <div className="p-4">

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              discount: 0,
              rating: 0,
            }}
          >
            {/* Product Images */}
            <Form.Item name="images" label="Product Images"
            rules={[{ required: false, message: "Please select product images!" }]}
            >
              {imageFiles.length > 0 && (
                <div className="flex gap-4">
                  {imageFiles.map((file) => (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{ width: "100px", height: "100px" }}
                    />
                  ))}
                </div>
              )}
              {initialData && (
                <div>
                  <div className="flex gap-4">
                    {initialData?.images?.map((image) => (
                      <img
                        src={image}
                        alt={initialData.name}
                        style={{ width: "100px", height: "100px" }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    setImageFiles(Array.from(e.target.files));
                  }
                }}
              />
            </Form.Item>

            {/* Product Name */}
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true, message: "Please enter the product name!" }]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>



            <div className="sm:flex gap-4">
              {/* Price */}
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please enter the price!" }]}
              >
                <InputNumber
                  min={0}
                  step={0.01}
                  placeholder="Enter price"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              {/* Quantity */}
              <Form.Item
                name="quantity"
                label="Quantity"
                rules={[{ required: true, message: "Please enter the quantity!" }]}
              >
                <InputNumber
                  min={1}
                  placeholder="Enter quantity"
                  style={{ width: "100%" }}
                />
              </Form.Item>

              {/* Discount */}
              <Form.Item name="discount" label="Discount">
                <InputNumber
                  min={0}
                  max={100}
                  step={0.1}
                  placeholder="Enter discount (%)"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div className="sm:flex gap-4 w-full">

              {/* Brand */}
              <Form.Item
                name="brand"
                className="w-full"
                label="Brand"
              rules={[{ required: false, message: "Please enter the brand!" }]}
              >
                <Input placeholder="Enter product brand" />
              </Form.Item>
              {/* Category */}
              <Form.Item
                name="categoryId"
                label="Category"
                className="w-full"
                rules={[{ required: true, message: "Please select a category!" }]}
              >
                <Select placeholder="Select category">
                  {categories.map((category: TCategory) => (
                    <Option value={category.id}>{category.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {/* Shop */}
            <Form.Item
              name="shopId"
              label="Shop"
              rules={[{ required: true, message: "Please select a shop!" }]}
            >
              <Select placeholder="Select shop">
                {shops.map((shop: TShop) => (
                  <Option value={shop.id}>{shop.name}</Option>
                ))}
              </Select>
            </Form.Item>



            {/* Colors */}
            <Form.Item
              name="colors"
              label="Colors"
            rules={[{ required: false, message: "Please select colors!" }]}
            >
              <Select
                mode="multiple"
                placeholder="Select available colors"
                allowClear
              >
                <Option value="red">Red</Option>
                <Option value="blue">Blue</Option>
                <Option value="green">Green</Option>
                <Option value="black">Black</Option>
                <Option value="white">White</Option>
              </Select>
            </Form.Item>

            {/* Sizes */}
            <Form.Item
              name="sizes"
              label="Sizes"
            rules={[{ required: false, message: "Please select sizes!" }]}
            >
              <Select
                mode="multiple"
                placeholder="Select available sizes"
                allowClear
              >
                <Option value="S">Small</Option>
                <Option value="M">Medium</Option>
                <Option value="L">Large</Option>
                <Option value="XL">Extra Large</Option>
              </Select>
            </Form.Item>

            {/* Features */}
            <Form.Item
              name="features"
              label="Features"
              rules={[{ required: true, message: "Please enter features!" }]}
            >
              <TextArea
                placeholder="Enter product features (separated by commas)"
                rows={4}
                onChange={(e) => {
                  const features = e.target.value.split(',').map(feature => feature.trim()).filter(Boolean);
                  form.setFieldValue('features', features);
                }}
              />
            </Form.Item>

            {/* Description */}
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter a description!" }]}
            >
              <TextArea placeholder="Enter product description" rows={4} />
            </Form.Item>


            {/* Form Buttons */}
            <Form.Item>
              <div className="flex gap-4 justify-end">
                <Button onClick={onClose}>Cancel</Button>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  {initialData ? "Update Product" : "Add Product"}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>

    </>
  );
};

export default ProductModal;
