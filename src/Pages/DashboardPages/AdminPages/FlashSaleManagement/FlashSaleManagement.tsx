import { useState } from "react";
import {
  Table,
  Button,
  Space,
  message,
  DatePicker,
  Form,
  Input,
  Modal,
  Typography
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, LoadingOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { useAddFlashSaleMutation, useDeleteFlashSaleMutation, useGetFlashSalesQuery, useUpdateFlashSaleMutation } from "../../../../Redux/Features/FlashSale/flashSaleApi";
import { Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import base64ToFile from "../../../../Utils/base64ToFile";
import moment from 'moment';

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface FlashSale {
  id: string;
  name: string;
  description: string;
  image: string;
  startDateTime: Date;
  endDateTime: Date;
  createdAt: Date;
  updatedAt: Date;
}
// Add interfaces
interface FlashSaleFormValues {
  name: string;
  description: string;
  image?: any;
  dateRange: [moment.Moment, moment.Moment];
  startDateTime?: Date;
  endDateTime?: Date;
}
const FlashSaleManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFashSale, setSelectedFashSale] = useState<FlashSale | null>(null);
  const [form] = Form.useForm();
  const [addFlashSale,{isLoading:flashSaleAdding}] = useAddFlashSaleMutation()
  const { data = {}, isLoading } = useGetFlashSalesQuery("");
  const flashSales = data.data || [];
  // 
  const [deleteFlashSale] = useDeleteFlashSaleMutation();
  // 
  const [updateFlashSale,{isLoading:flashSaleUpdating}] = useUpdateFlashSaleMutation();
  // Add these state variables
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();


  // Add these functions
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
        form.setFieldsValue({ image: url });
      });
    }
  };


  const columns: TableProps<FlashSale>['columns'] = [
    {
      title: '#',
      key: 'index',
      render: (_text: any, _record: any, index: number) => index + 1,
    },
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDateTime',
      key: 'startDateTime',
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'End Date',
      dataIndex: 'endDateTime',
      key: 'endDateTime',
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'endDateTime',
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
      render: (_: any, record: FlashSale) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (flashSale: FlashSale) => {
    setSelectedFashSale(flashSale);
    setImageUrl(flashSale.image);
    form.setFieldsValue({
      name: flashSale.name,
      description: flashSale.description,
      dateRange: [
        moment(flashSale.startDateTime),
        moment(flashSale.endDateTime)
      ]
    });
    setIsModalVisible(true);
  };

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
          const res = await deleteFlashSale(id);
          console.log(res);
          if (res?.data?.success) {
            message.success('Flash sale deleted successfully');
            
          } else if (res.error) {
            throw new Error(  'Failed to delete');
          }
        } catch (error) {
          message.error('Failed to delete flash sale');
        }
      },
    });
  };




  // Update handleSubmit function
  const handleSubmit = async (values: FlashSaleFormValues) => {

    try {
      if (selectedFashSale) {
        const fashSaleData = {
          name: values.name,
          description: values.description,
          startDateTime: values.startDateTime,
          endDateTime: values.endDateTime,
        }
        const res =await updateFlashSale({ id: selectedFashSale.id, data: fashSaleData });
        if (res?.data.success) {
          message.success('Flash sale updated successfully');
          setIsModalVisible(false);
          form.resetFields();
          setSelectedFashSale(null);
        } else if (res.error) {
          throw new Error('Failed to update flash sale');
        }
      } else {

        const formData = new FormData();

        const flashSaleData = {
          name: values.name,
          description: values.description,
          startDateTime: values.dateRange[0].toISOString(),
          endDateTime: values.dateRange[1].toISOString(),
        };

        // Append JSON data
        formData.append('data', JSON.stringify(flashSaleData));



        // Convert base64 to file if it exists
        if (values.image && values.image.includes('base64')) {
          const imageFile = base64ToFile(values.image, 'flash-sale-image.jpg');
          formData.append('image', imageFile);
        }
        // Call API with formData
        const res = await addFlashSale(formData);

        if (res.data.success) {
          message.success(`Flash sale ${selectedFashSale ? 'updated' : 'created'} successfully`);
          setIsModalVisible(false);
          form.resetFields();
          setSelectedFashSale(null);
        } else if (res.error) {
          throw new Error('Failed to save flash sale');
        }
      }
    } catch (error) {
      message.error('Failed to save flash sale: ' + (error as Error).message);
    }
  };



  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="mb-6 flex justify-between items-center">
        <Title level={2}>Flash Sale Management</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
          className="bg-blue-500"
        >
          Add Flash Sale
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={flashSales}
        rowKey="id"
        className="mb-8"
        loading={isLoading}
        pagination={{
          pageSize: 10,
          total: flashSales.length,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
      />



      <Modal
        title={selectedFashSale ? "Edit Flash Sale" : "Add Flash Sale"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setSelectedFashSale(null);
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
            name="image"
            label="Image"
            rules={[{ required: !selectedFashSale?true:false, message: "Please upload an image" }]}
          >
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              customRequest={({ file, onSuccess }) => {
                setTimeout(() => {
                  onSuccess!("ok");
                }, 0);
              }}
              disabled={selectedFashSale ? true : false}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="flash sale" style={{ width: '100%' }} />
              ) : (
                <div>
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            name="name"
            label="Flash Sale Name"
            rules={[{ required: true, message: "Please enter flash sale name" }]}
          >
            <Input placeholder="Enter flash sale name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea placeholder="Enter flash sale description" rows={4} />
          </Form.Item>


          <Form.Item
            name="dateRange"
            label="Sale Period"
            rules={[{ required: true, message: "Please select date range" }]}
          >
            <RangePicker
              showTime
              className="w-full"
              format="YYYY-MM-DD HH:mm:ss"
              onChange={(dates) => {
                if (dates) {
                  form.setFieldsValue({
                    startDateTime: dates[0],
                    endDateTime: dates[1]
                  });
                }
              }}
            />
          </Form.Item>

          {/* Hidden fields to store individual date values */}
          <Form.Item name="startDateTime" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="endDateTime" hidden>
            <Input />
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  form.resetFields();
                  setSelectedFashSale(null);
                }}
              >
                Cancel
              </Button>
              <Button
              loading={flashSaleUpdating||flashSaleAdding}
              type="primary" htmlType="submit" className="bg-blue-500">
                {selectedFashSale ? "Update" : "Create"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FlashSaleManagement;