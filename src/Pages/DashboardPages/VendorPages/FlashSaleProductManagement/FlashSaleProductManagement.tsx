import { useState } from "react";
import {
  Table,
  Button,
  message,
  Form,
  Input,
  Modal,
  Select,
  Typography
} from "antd";
import { DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { useGetVendorProductsQuery } from "../../../../Redux/Features/Product/productApi";
import { TProduct } from "../../../../Interface";
import { useAddFlashSaleItemMutation, useDeleteFlashSaleItemMutation, useGetFlashSalesQuery, useGetVendorFlashSaleProductsQuery, } from "../../../../Redux/Features/FlashSale/flashSaleApi";


const { Title } = Typography;
// const { RangePicker } = DatePicker;

interface FlashSaleProduct {
  id: string;
  product: TProduct;
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
  status: 'ACTIVE' | 'SCHEDULED' | 'ENDED';
}

const FlashSaleProductManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  // Add flash sale item
  const [addFlashSaleItem] = useAddFlashSaleItemMutation()
  // delete flash sale item
  const [deleteFlashSaleItem] = useDeleteFlashSaleItemMutation()
  // Fetch products for dropdown
  const { data: productsData = {}, isLoading } = useGetVendorProductsQuery({ page: 1, limit: 100 });
  const { data: products = [] } = productsData?.data || {};
  // Fetch flash sales
  const { data = {}, } = useGetFlashSalesQuery("");
  const flashSales = data.data || [];

  // Fetch flash sale products
  const { data: flashSaleProductsData = {}, isLoading: isFlashSaleProductsLoading } = useGetVendorFlashSaleProductsQuery("");
  const flashSaleProducts = flashSaleProductsData?.data || [];


  // Table columns
  const columns: TableProps<FlashSaleProduct>['columns'] = [
    {
      title: 'Product',
      dataIndex: ['product', 'name'],
      key: 'name',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      render: (discount: number) => `${discount}%`,
    },
    {
      title: 'Flash Sale',
      dataIndex: ['flashSale', 'name'],
      key: 'flashSale',
    },
    {
      title: 'Start Date',
      dataIndex: ['flashSale', 'startDateTime'],
      key: 'startDate',
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'End Date',
      dataIndex: ['flashSale', 'endDateTime'],
      key: 'endDate',
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: ['flashSale', 'endDateTime'],
      key: 'status',
      render: (endDateTime) => (
        <span className={`px-3 py-1 rounded-full font-medium text-sm ${new Date(endDateTime) > new Date()
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-700'
          }`}>
          {new Date(endDateTime) > new Date() ? 'Active' : 'Ended'}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: FlashSaleProduct) => (


        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.id)}
        />

      ),
    },
  ];



  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this flash sale?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      centered: true,
      async onOk() {
        try {
          const res = await deleteFlashSaleItem(id);
          if (res?.data?.success) {
            message.success('Flash sale deleted successfully');

          } else if (res.error) {
            message.error('Failed to delete');
          }
        } catch (error) {
          message.error('Failed to delete flash sale');
        }
      },
    });
  };

  const handleSubmit = async (values: any) => {
    try {
      const flashSaleData = {
        flashSaleId: values.flashSaleId,
        productId: values.productId,
        discount: Number(values.discountPercentage),
      };


      const res = await addFlashSaleItem(flashSaleData)
      console.log(res)
      if (res.data?.success) {
        message.success('Flash sale added successfully');
        setIsModalVisible(false);
        form.resetFields();

      } else if (res.error) {
        message.error('Failed to save flash sale');
      }

    } catch (error) {
      message.error('Failed to save flash sale');
    }
  };



  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="mb-6 flex justify-between items-center">
        <Title level={2}>Flash Sale Product Management</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
          className="bg-blue-500"
        >
          Add Product to Flash Sale
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={flashSaleProducts}
        rowKey="id"
        className="mb-8"
        loading={isFlashSaleProductsLoading}
        pagination={{
          pageSize: 10,
          total: flashSales.length,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
      />

      <Modal
        title={"Add Flash Sale"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-4"
        >
          <Form.Item
            name="flashSaleId"
            label="FlashSale"
            rules={[{ required: true, message: "Please select a FlashSale" }]}
          >
            <Select
              placeholder="Select a FlashSale"
              className="w-full"
              showSearch
              optionFilterProp="children"
            >
              {flashSales.map((flashSale: any) => (
                <Select.Option key={flashSale.id} value={flashSale.id}>
                  {flashSale.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="productId"
            label="Product"
            rules={[{ required: true, message: "Please select a product" }]}
          >
            <Select
              placeholder="Select a product"
              className="w-full"
              showSearch
              optionFilterProp="children"
              loading={isLoading}
            >
              {products.map((product: TProduct) => (
                <Select.Option key={product.id} value={product.id}>
                  {product.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="discountPercentage"
            label="Discount Percentage"
            rules={[
              { required: true, message: "Please enter discount percentage" },
              // { type: "number", min: 1, max: 99 },
            ]}
          >
            <Input type="number" placeholder="Enter discount percentage" />
          </Form.Item>
          {/* 
          <Form.Item
            name="dateRange"
            label="Sale Period"
            rules={[{ required: true, message: "Please select date range" }]}
          >
            <RangePicker
              showTime
              className="w-full"
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Form.Item> */}

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" className="bg-blue-500">
                Add
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FlashSaleProductManagement;