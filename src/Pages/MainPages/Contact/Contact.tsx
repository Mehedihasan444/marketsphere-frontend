import { useState } from 'react';
import { Breadcrumb, Form, Input, Button, message, Card, Row, Col } from 'antd';
import { 
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  SendOutlined,
  CustomerServiceOutlined,
  QuestionCircleOutlined,
  ShoppingOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const contactInfo = [
    {
      icon: <MailOutlined className="text-3xl text-[#1890ff]" />,
      title: 'Email Us',
      detail: 'support@marketsphere.com',
      subDetail: 'sales@marketsphere.com',
    },
    {
      icon: <PhoneOutlined className="text-3xl text-[#52c41a]" />,
      title: 'Call Us',
      detail: '+1 (555) 123-4567',
      subDetail: 'Mon-Fri, 9AM-6PM EST',
    },
    {
      icon: <EnvironmentOutlined className="text-3xl text-[#fa8c16]" />,
      title: 'Visit Us',
      detail: '123 Market Street',
      subDetail: 'San Francisco, CA 94102',
    },
    {
      icon: <ClockCircleOutlined className="text-3xl text-[#eb2f96]" />,
      title: 'Business Hours',
      detail: 'Monday - Friday: 9AM - 6PM',
      subDetail: 'Weekend: 10AM - 4PM EST',
    },
  ];

  const quickLinks = [
    {
      icon: <CustomerServiceOutlined className="text-4xl text-[#1890ff]" />,
      title: 'Customer Support',
      description: 'Get help with orders, returns, and account issues',
      link: '/support',
    },
    {
      icon: <QuestionCircleOutlined className="text-4xl text-[#52c41a]" />,
      title: 'FAQ',
      description: 'Find answers to commonly asked questions',
      link: '/faq',
    },
    {
      icon: <ShoppingOutlined className="text-4xl text-[#fa8c16]" />,
      title: 'Vendor Inquiry',
      description: 'Interested in selling on our platform?',
      link: '/become-seller',
    },
  ];

  const onFinish = async (values: { firstName: string; lastName: string; email: string; phone?: string; subject: string; message: string }) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Contact form values:', values);
      message.success('Thank you for contacting us! We will get back to you within 24 hours.');
      form.resetFields();
    } catch {
      message.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Breadcrumb
            items={[
              {
                href: '/',
                title: (
                  <>
                    <HomeOutlined />
                    <span>Home</span>
                  </>
                ),
              },
              {
                title: 'Contact Us',
              },
            ]}
          />
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1890ff] to-[#096dd9] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-95">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <Row gutter={[24, 24]}>
          {contactInfo.map((info, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card className="text-center h-full shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">{info.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-gray-700 font-medium">{info.detail}</p>
                <p className="text-gray-500 text-sm mt-1">{info.subDetail}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Main Contact Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Row gutter={[48, 48]}>
          {/* Contact Form */}
          <Col xs={24} lg={14}>
            <Card className="shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark="optional"
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="firstName"
                      label="First Name"
                      rules={[{ required: true, message: 'Please enter your first name' }]}
                    >
                      <Input size="large" placeholder="John" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                      rules={[{ required: true, message: 'Please enter your last name' }]}
                    >
                      <Input size="large" placeholder="Doe" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input 
                    size="large" 
                    prefix={<MailOutlined className="text-gray-400" />}
                    placeholder="john.doe@example.com" 
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number (Optional)"
                >
                  <Input 
                    size="large" 
                    prefix={<PhoneOutlined className="text-gray-400" />}
                    placeholder="+1 (555) 123-4567" 
                  />
                </Form.Item>

                <Form.Item
                  name="subject"
                  label="Subject"
                  rules={[{ required: true, message: 'Please enter a subject' }]}
                >
                  <Input size="large" placeholder="How can we help you?" />
                </Form.Item>

                <Form.Item
                  name="message"
                  label="Message"
                  rules={[
                    { required: true, message: 'Please enter your message' },
                    { min: 10, message: 'Message must be at least 10 characters' }
                  ]}
                >
                  <TextArea 
                    rows={6} 
                    placeholder="Tell us more about your inquiry..."
                    showCount
                    maxLength={500}
                  />
                </Form.Item>

                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    size="large" 
                    icon={<SendOutlined />}
                    loading={loading}
                    block
                    className="h-12 text-lg font-semibold"
                  >
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          {/* Quick Links & Map */}
          <Col xs={24} lg={10}>
            <div className="space-y-6">
              {/* Quick Links */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Links</h2>
                <div className="space-y-4">
                  {quickLinks.map((link, index) => (
                    <Card 
                      key={index} 
                      hoverable
                      className="border-l-4 border-[#1890ff]"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">{link.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {link.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">{link.description}</p>
                          <Link to={link.link} className="text-[#1890ff] hover:underline text-sm font-medium">
                            Learn More →
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <Card>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Location</h3>
                <div className="bg-gray-200 rounded-lg overflow-hidden h-64 flex items-center justify-center">
                  <div className="text-center">
                    <EnvironmentOutlined className="text-6xl text-gray-400 mb-2" />
                    <p className="text-gray-600 font-medium">San Francisco, CA</p>
                    <p className="text-gray-500 text-sm">123 Market Street, 94102</p>
                  </div>
                </div>
                <div className="mt-4">
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#1890ff] hover:underline font-medium"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>

      {/* FAQ Preview Section */}
      <div className="bg-white py-16 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Looking for quick answers? Check out our comprehensive FAQ section for 
            instant solutions to common questions.
          </p>
          <Link to="/faq">
            <Button type="primary" size="large" icon={<QuestionCircleOutlined />}>
              Visit FAQ Center
            </Button>
          </Link>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-gradient-to-r from-[#1890ff] to-[#096dd9] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
          <p className="text-lg mb-6 opacity-95">Follow us on social media for updates and promotions</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
              <span className="text-[#1890ff] text-xl">f</span>
            </a>
            <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
              <span className="text-[#1890ff] text-xl">𝕏</span>
            </a>
            <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
              <span className="text-[#1890ff] text-xl">in</span>
            </a>
            <a href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
              <span className="text-[#1890ff] text-xl">📷</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
