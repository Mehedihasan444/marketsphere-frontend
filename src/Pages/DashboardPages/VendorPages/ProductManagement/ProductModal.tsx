// import { useState } from "react";
// import {
//   Form,
//   Input,
//   InputNumber,
//   Button,
//   Select,
//   Upload,
//   message,
// } from "antd";
// import { useAddProductMutation } from "../../../../Redux/Features/Product/productApi";

// const { TextArea } = Input;
// const { Option } = Select;

// const AddProduct = () => {
//   const [form] = Form.useForm();
//   const [addProduct, { isLoading }] = useAddProductMutation(); // Redux mutation hook
//   const [imageFiles, setImageFiles] = useState<File[]>([]); // Handle multiple images

//   const handleSubmit = async (values: any) => {
//     const formData = new FormData();

//     // Append text fields
//     const data = {
//       name: values.name,
//       description: values.description,
//       price: values.price,
//       discount: values.discount,
//       quantity: values.quantity,
//       rating: values.rating || 0, // Default rating to 0
//       categoryId: values.categoryId,
//       shopId: values.shopId,
//       flashSaleId: values.flashSaleId || null, // Optional field
//     };
//     formData.append("data", JSON.stringify(data));

//     // Append image files
//     imageFiles.forEach((file) => formData.append("images", file));

//     try {
//       const response = await addProduct(formData);
//       if (response?.data?.success) {
//         message.success("Product added successfully!");
//         form.resetFields();
//         setImageFiles([]);
//       } else if (response?.error) {
//         message.error(
//           response?.error?.data?.message || "Failed to add product."
//         );
//       }
//     } catch (error) {
//       console.error(error);
//       message.error("An error occurred while adding the product.");
//     }
//   };

//   return (
//     <div className="bg-white p-5">
//       <h2 className="text-xl font-semibold mb-4">Add Product</h2>
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={handleSubmit}
//         initialValues={{
//           discount: 0,
//           rating: 0,
//         }}
//       >
//         <Form.Item
//           name="name"
//           label="Product Name"
//           rules={[
//             { required: true, message: "Please enter the product name!" },
//           ]}
//         >
//           <Input placeholder="Enter product name" />
//         </Form.Item>

//         <Form.Item
//           name="description"
//           label="Description"
//           rules={[{ required: true, message: "Please enter a description!" }]}
//         >
//           <TextArea placeholder="Enter product description" rows={4} />
//         </Form.Item>
//         <div className="sm:flex gap-5 items-center justify-between">
//           <Form.Item
//             name="price"
//             label="Price"
//             rules={[{ required: true, message: "Please enter the price!" }]}
//           >
//             <InputNumber
//               min={0}
//               step={0.01}
//               placeholder="Enter price"
//               style={{ width: "100%" }}
//             />
//           </Form.Item>

//           <Form.Item
//             name="quantity"
//             label="Quantity"
//             rules={[{ required: true, message: "Please enter the quantity!" }]}
//           >
//             <InputNumber
//               min={1}
//               placeholder="Enter quantity"
//               style={{ width: "100%" }}
//             />
//           </Form.Item>

//           <Form.Item name="discount" label="Discount">
//             <InputNumber
//               min={0}
//               max={100}
//               step={0.1}
//               placeholder="Enter discount (as %)"
//               style={{ width: "100%" }}
//             />
//           </Form.Item>
//           <Form.Item
//             name="categoryId"
//             label="Category"
//             rules={[{ required: true, message: "Please select a category!" }]}
//           >
//             <Select placeholder="Select category">
//               <Option value="category1">Category 1</Option>
//               <Option value="category2">Category 2</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name="shopId"
//             label="Shop"
//             rules={[{ required: true, message: "Please select a shop!" }]}
//           >
//             <Select placeholder="Select shop">
//               <Option value="shop1">Shop 1</Option>
//               <Option value="shop2">Shop 2</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item name="flashSaleId" label="Flash Sale (Optional)">
//             <Select placeholder="Select flash sale (if applicable)">
//               <Option value="flashSale1">Flash Sale 1</Option>
//               <Option value="flashSale2">Flash Sale 2</Option>
//             </Select>
//           </Form.Item>
//         </div>

//         <Form.Item name="images" label="Product Images">
//           {/* <Upload
//             listType="picture"
//             multiple
//             beforeUpload={() => false} // Prevent automatic upload
//             onChange={(e)=>setImageFiles(e.fileList?.map((file)=>file.originFileObj)||[])} // Handle image files
//           >
//             <Button icon={<UploadOutlined />}>Upload Images</Button>
//           </Upload> */}

//           <Input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={(e) => {
//               if (e.target.files) {
//                 setImageFiles(Array.from(e.target.files));
//               }
//             }}
//           />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" loading={isLoading}>
//             Add Product
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default AddProduct;
// import React, { useState } from "react";
// import {
//   Form,
//   Input,
//   InputNumber,
//   Button,
//   Select,
//   message,
//   Modal,
// } from "antd";
// import { useAddProductMutation } from "../../../../Redux/Features/Product/productApi";

// const { TextArea } = Input;
// const { Option } = Select;

// const ProductModal = ({ isVisible, onClose, initialData = null }: any) => {
//   const [form] = Form.useForm();
//   const [addProduct, { isLoading }] = useAddProductMutation(); // Redux mutation hook
//   const [imageFiles, setImageFiles] = useState<File[]>([]); // Handle multiple images

//   // Pre-fill form when editing
//   React.useEffect(() => {
//     if (initialData) {
//       form.setFieldsValue(initialData);
//     } else {
//       form.resetFields();
//     }
//   }, [initialData, form]);

//   const handleSubmit = async (values: any) => {
//     const formData = new FormData();

//     // Append text fields
//     const data = {
//       name: values.name,
//       description: values.description,
//       price: values.price,
//       discount: values.discount,
//       quantity: values.quantity,
//       rating: values.rating || 0, // Default rating to 0
//       categoryId: values.categoryId,
//       shopId: values.shopId,
//       flashSaleId: values.flashSaleId || null, // Optional field
//     };
//     formData.append("data", JSON.stringify(data));

//     // Append image files
//     imageFiles.forEach((file) => formData.append("images", file));

//     try {
//       const response = await addProduct(formData);
//       if (response?.data?.success) {
//         message.success(
//           initialData ? "Product updated successfully!" : "Product added successfully!"
//         );
//         form.resetFields();
//         setImageFiles([]);
//         onClose(); // Close modal on success
//       } else if (response?.error) {
//         message.error(
//           response?.error?.data?.message || "Failed to add/update product."
//         );
//       }
//     } catch (error) {
//       console.error(error);
//       message.error("An error occurred while processing the product.");
//     }
//   };

//   return (
//     <Modal
//       title={initialData ? "Edit Product" : "Add Product"}
//       open={isVisible}
//       onCancel={onClose}
//       footer={null} // Custom footer using form buttons
//     >
//       <div className="p-4">
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleSubmit}
//           initialValues={{
//             discount: 0,
//             rating: 0,
//           }}
//         >
//           <Form.Item
//             name="name"
//             label="Product Name"
//             rules={[{ required: true, message: "Please enter the product name!" }]}
//           >
//             <Input placeholder="Enter product name" />
//           </Form.Item>

//           <Form.Item
//             name="description"
//             label="Description"
//             rules={[{ required: true, message: "Please enter a description!" }]}
//           >
//             <TextArea placeholder="Enter product description" rows={4} />
//           </Form.Item>

//           <div className="sm:flex gap-4">
//             <Form.Item
//               name="price"
//               label="Price"
//               rules={[{ required: true, message: "Please enter the price!" }]}
//             >
//               <InputNumber
//                 min={0}
//                 step={0.01}
//                 placeholder="Enter price"
//                 style={{ width: "100%" }}
//               />
//             </Form.Item>

//             <Form.Item
//               name="quantity"
//               label="Quantity"
//               rules={[{ required: true, message: "Please enter the quantity!" }]}
//             >
//               <InputNumber
//                 min={1}
//                 placeholder="Enter quantity"
//                 style={{ width: "100%" }}
//               />
//             </Form.Item>

//             <Form.Item name="discount" label="Discount">
//               <InputNumber
//                 min={0}
//                 max={100}
//                 step={0.1}
//                 placeholder="Enter discount (%)"
//                 style={{ width: "100%" }}
//               />
//             </Form.Item>
//           </div>

//           <Form.Item
//             name="categoryId"
//             label="Category"
//             rules={[{ required: true, message: "Please select a category!" }]}
//           >
//             <Select placeholder="Select category">
//               <Option value="category1">Category 1</Option>
//               <Option value="category2">Category 2</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name="shopId"
//             label="Shop"
//             rules={[{ required: true, message: "Please select a shop!" }]}
//           >
//             <Select placeholder="Select shop">
//               <Option value="shop1">Shop 1</Option>
//               <Option value="shop2">Shop 2</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item name="flashSaleId" label="Flash Sale (Optional)">
//             <Select placeholder="Select flash sale (if applicable)">
//               <Option value="flashSale1">Flash Sale 1</Option>
//               <Option value="flashSale2">Flash Sale 2</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item name="images" label="Product Images">
//             <Input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={(e) => {
//                 if (e.target.files) {
//                   setImageFiles(Array.from(e.target.files));
//                 }
//               }}
//             />
//           </Form.Item>

//           <Form.Item>
//             <div className="flex gap-4 justify-end">
//               <Button onClick={onClose}>Cancel</Button>
//               <Button type="primary" htmlType="submit" loading={isLoading}>
//                 {initialData ? "Update Product" : "Add Product"}
//               </Button>
//             </div>
//           </Form.Item>
//         </Form>
//       </div>
//     </Modal>
//   );
// };

// export default ProductModal;
import React, { useState, useEffect } from "react";
import { Button, Form, Input, InputNumber, message, Modal, Select } from "antd";
import { useAddProductMutation } from "../../../../Redux/Features/Product/productApi";
import { TCategory, TProduct } from "../../../../Interface";
import { useGetAllCategoriesQuery } from "../../../../Redux/Features/Category/categoryApi";
import { useGetVendorQuery } from "../../../../Redux/Features/Vendor/vendorApi";
import { useAppSelector } from "../../../../Redux/hook";

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
  const {
    data: shopData = {},
    isLoading: shopLoading,
    error,
  } = useGetVendorQuery(vendor?.email as string);

  const { id, shop: shops = [], name } = shopData.data || {};
  console.log(shops);

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

  const handleSubmit = async (values: any) => {
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
      flashSaleId: values.flashSaleId || null, // Optional field
    };
    formData.append("data", JSON.stringify(data));

    // Append image files
    imageFiles.forEach((file) => formData.append("images", file));

    try {
      const response = await addProduct(formData);
      if (response?.data?.success) {
        message.success(
          initialData
            ? "Product updated successfully!"
            : "Product added successfully!"
        );
        onClose(); // Close modal on success
      } else if (response?.error) {
        message.error(
          response?.error?.data?.message || "Failed to add/update product."
        );
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while processing the product.");
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {initialData ? "Edit Product" : "Add Product"}
      </Button>
      <Modal
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
            <Form.Item
              name="name"
              label="Product Name"
              rules={[
                { required: true, message: "Please enter the product name!" },
              ]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter a description!" },
              ]}
            >
              <TextArea placeholder="Enter product description" rows={4} />
            </Form.Item>

            <div className="sm:flex gap-4">
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

              <Form.Item
                name="quantity"
                label="Quantity"
                rules={[
                  { required: true, message: "Please enter the quantity!" },
                ]}
              >
                <InputNumber
                  min={1}
                  placeholder="Enter quantity"
                  style={{ width: "100%" }}
                />
              </Form.Item>

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

            <Form.Item
              name="categoryId"
              label="Category"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select placeholder="Select category">
                {categories.map((category: TCategory) => (
                  <Option value={category.id}>{category.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="shopId"
              label="Shop"
              rules={[{ required: true, message: "Please select a shop!" }]}
            >
              <Select placeholder="Select shop">
                {shops.map((shop: any) => (
                  <Option value={shop.id}>{shop.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="flashSaleId" label="Flash Sale (Optional)">
              <Select placeholder="Select flash sale (if applicable)" disabled>
                <Option value="flashSale1">Flash Sale 1</Option>
                <Option value="flashSale2">Flash Sale 2</Option>
              </Select>
            </Form.Item>

            <Form.Item name="images" label="Product Images">
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
