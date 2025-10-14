import React, { useState, useEffect } from "react";
import { Button, Form, Input, InputNumber, message, Modal, Select } from "antd";
import { useAddProductMutation, useUpdateProductMutation } from "../../../../Redux/Features/Product/productApi";
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
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]); // Store preview URLs
  const [form] = Form.useForm();
  const [addProduct, { isLoading }] = useAddProductMutation(); // Redux mutation hook for adding
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation(); // Redux mutation hook for updating
  const { data = {} } = useGetAllCategoriesQuery({ page: 1, limit: 10 }); // Redux query hook
  const { data: categories = [] } = data.data || {};
  const vendor = useAppSelector((state) => state.auth.user);
  // Fetch vendor all shops
  const { data: shopData = {} } = useGetVendorQuery(vendor?.email as string);

  const { shop: shops = [] } = shopData.data || {};

  // Open modal
  const showModal = () => {
    setImageFiles([]);
    setImagePreviewUrls([]);
    setOpen(true);
  };

  // Close modal
  const onClose = () => {
    setOpen(false);
    form.resetFields();
    // Cleanup image preview URLs to prevent memory leaks
    imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
    setImageFiles([]);
    setImagePreviewUrls([]);
  };

  // Cleanup image preview URLs when component unmounts
  useEffect(() => {
    return () => {
      imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagePreviewUrls]);

  // Pre-fill form when editing
  useEffect(() => {
    if (initialData) {
      // Convert features array to comma-separated string for TextArea display
      const formValues = {
        ...initialData,
        features: initialData.features?.join(', ') || '',
      };
      form.setFieldsValue(formValues);
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  console.log("initialData",initialData)
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
    color?: string[];
    size?: string[];
    features?: string[] | string;
  }) => {
    const formData = new FormData();

    // Ensure features is an array (could be string if user didn't blur the field)
    let featuresArray: string[] = [];
    if (typeof values.features === 'string') {
      featuresArray = values.features.split(',').map(feature => feature.trim()).filter(Boolean);
    } else if (Array.isArray(values.features)) {
      featuresArray = values.features;
    }

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
      color: values.color || [],
      size: values.size || [],
      features: featuresArray,
    };
    formData.append("data", JSON.stringify(data));
console.log(data)
    // Append image files (only if new images are selected)
    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => formData.append("images", file));
    }

    try {
      let res;
      
      // Use updateProduct if editing, addProduct if creating new
      if (initialData) {
        res = await updateProduct({ id: initialData.id, body: formData });
      } else {
        res = await addProduct(formData);
      }
      
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
            <Form.Item 
              name="images" 
              label={
                <span className="text-sm font-medium">
                  Product Images 
                  <span className="text-gray-400 text-xs ml-2">(Max 5 images, 5MB each)</span>
                </span>
              }
              rules={[{ required: false, message: "Please select product images!" }]}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {/* Image Previews */}
                {imagePreviewUrls.length > 0 || (initialData?.images && initialData.images.length > 0) ? (
                  <>
                    {/* Show existing images first (when editing) */}
                    {initialData?.images && imagePreviewUrls.length === 0 && initialData.images.map((image, index) => (
                      <div
                        key={`existing-image-${index}`}
                        className="relative group overflow-hidden rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
                      >
                        <div className="aspect-square">
                          <img
                            src={image}
                            alt={initialData.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {index === 0 && (
                          <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                            Primary
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Show existing images + new images together when editing and new images are added */}
                    {initialData?.images && imagePreviewUrls.length > 0 && (
                      <>
                        {initialData.images.map((image, index) => (
                          <div
                            key={`existing-image-${index}`}
                            className="relative group overflow-hidden rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
                          >
                            <div className="aspect-square">
                              <img
                                src={image}
                                alt={initialData.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {index === 0 && (
                              <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                                Primary
                              </div>
                            )}
                          </div>
                        ))}
                        {imagePreviewUrls.map((url, index) => (
                          <div
                            key={`new-image-${index}`}
                            className="relative group overflow-hidden rounded-lg border-2 border-dashed border-blue-300 bg-blue-50"
                          >
                            <div className="aspect-square">
                              <img
                                src={url}
                                alt={`New ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute top-1 right-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
                              New
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                    
                    {/* Show only new images when creating new product */}
                    {!initialData && imagePreviewUrls.length > 0 && imagePreviewUrls.map((url, index) => (
                      <div
                        key={`new-image-${index}`}
                        className="relative group overflow-hidden rounded-lg border-2 border-dashed border-blue-300 bg-blue-50"
                      >
                        <div className="aspect-square">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute top-1 right-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
                          New
                        </div>
                      </div>
                    ))}
                    
                    {/* Add More Button - show if total images < 5 */}
                    {((initialData?.images?.length || 0) + imagePreviewUrls.length) < 5 && (
                      <label className="relative aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 cursor-pointer bg-gray-50 hover:bg-blue-50 transition-all flex items-center justify-center group">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              const files = Array.from(e.target.files);
                              const currentTotal = (initialData?.images?.length || 0) + imagePreviewUrls.length;
                              const remainingSlots = 5 - currentTotal;
                              
                              if (files.length > remainingSlots) {
                                message.warning(`You can only upload ${remainingSlots} more image(s).`);
                                return;
                              }
                              
                              const maxSize = 5 * 1024 * 1024;
                              const validFiles = files.filter(file => {
                                if (file.size > maxSize) {
                                  message.warning(`${file.name} is too large. Maximum size is 5MB.`);
                                  return false;
                                }
                                return true;
                              });

                              if (validFiles.length > 0) {
                                setImageFiles([...imageFiles, ...validFiles]);
                                const newUrls = validFiles.map(file => URL.createObjectURL(file));
                                setImagePreviewUrls([...imagePreviewUrls, ...newUrls]);
                                message.success(`${validFiles.length} image(s) added!`);
                              }
                            }
                          }}
                        />
                        <div className="text-center">
                          <div className="text-3xl text-gray-400 group-hover:text-blue-500 mb-1">+</div>
                          <div className="text-xs text-gray-500">{imagePreviewUrls.length > 0 || initialData ? 'Add More' : 'Upload'}</div>
                        </div>
                      </label>
                    )}
                  </>
                ) : (
                  // Initial upload area
                  <label className="col-span-2 sm:col-span-3 md:col-span-4 relative rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 cursor-pointer bg-gray-50 hover:bg-blue-50 transition-all p-8 flex flex-col items-center justify-center group">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const files = Array.from(e.target.files);
                          
                          if (files.length > 5) {
                            message.warning("You can only upload up to 5 images.");
                            return;
                          }
                          
                          const maxSize = 5 * 1024 * 1024;
                          const validFiles = files.filter(file => {
                            if (file.size > maxSize) {
                              message.warning(`${file.name} is too large. Maximum size is 5MB.`);
                              return false;
                            }
                            return true;
                          });

                          if (validFiles.length > 0) {
                            setImageFiles(validFiles);
                            const urls = validFiles.map(file => URL.createObjectURL(file));
                            setImagePreviewUrls(urls);
                            message.success(`${validFiles.length} image(s) selected successfully!`);
                          }
                        }
                      }}
                    />
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-600 group-hover:text-blue-600">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  </label>
                )}
              </div>
              
              {/* Status Message */}
              {(imagePreviewUrls.length > 0 || (initialData?.images && initialData.images.length > 0)) && (
                <p className="text-xs text-gray-500 mt-2">
                  {imagePreviewUrls.length > 0 && initialData ? (
                    <span className="text-green-600 font-medium">
                      ✓ Total: {(initialData?.images?.length || 0) + imagePreviewUrls.length} image(s) 
                      <span className="text-gray-500"> ({initialData?.images?.length || 0} existing + {imagePreviewUrls.length} new)</span>
                    </span>
                  ) : imagePreviewUrls.length > 0 ? (
                    <span className="text-green-600 font-medium">
                      ✓ {imagePreviewUrls.length} image(s) selected
                    </span>
                  ) : (
                    <span className="text-blue-600">
                      Current: {initialData?.images?.length || 0} image(s) • Click + to add more
                    </span>
                  )}
                </p>
              )}
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
                    <Option key={category.id} value={category.id}>{category.name}</Option>
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
                  <Option key={shop.id} value={shop.id}>{shop.name}</Option>
                ))}
              </Select>
            </Form.Item>



            {/* Colors */}
            <Form.Item
              name="color"
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
              name="size"
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
                onBlur={(e) => {
                  // Convert comma-separated string to array when field loses focus
                  const featuresArray = e.target.value.split(',').map(feature => feature.trim()).filter(Boolean);
                  form.setFieldValue('features', featuresArray);
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
                <Button type="primary" htmlType="submit" loading={isLoading || isUpdating}>
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
