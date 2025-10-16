import { Breadcrumb, Card, Row, Col, Statistic } from 'antd';
import { 
  HomeOutlined,
  TeamOutlined,
  TrophyOutlined,
  RocketOutlined,
  CustomerServiceOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  HeartOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    {
      title: 'Active Users',
      value: 50000,
      suffix: '+',
      icon: <TeamOutlined className="text-4xl text-[#1890ff]" />,
    },
    {
      title: 'Products',
      value: 100000,
      suffix: '+',
      icon: <TrophyOutlined className="text-4xl text-[#52c41a]" />,
    },
    {
      title: 'Vendors',
      value: 5000,
      suffix: '+',
      icon: <RocketOutlined className="text-4xl text-[#fa8c16]" />,
    },
    {
      title: 'Countries',
      value: 50,
      suffix: '+',
      icon: <HeartOutlined className="text-4xl text-[#eb2f96]" />,
    },
  ];

  const values = [
    {
      icon: <CustomerServiceOutlined className="text-5xl text-[#1890ff]" />,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction above everything else, ensuring a seamless shopping experience.',
    },
    {
      icon: <SafetyOutlined className="text-5xl text-[#52c41a]" />,
      title: 'Trust & Security',
      description: 'Your data and transactions are protected with industry-leading security measures.',
    },
    {
      icon: <ThunderboltOutlined className="text-5xl text-[#fa8c16]" />,
      title: 'Innovation',
      description: 'We continuously evolve to bring you the latest technology and best shopping features.',
    },
    {
      icon: <HeartOutlined className="text-5xl text-[#eb2f96]" />,
      title: 'Quality Products',
      description: 'Every product on our platform meets strict quality standards and authenticity checks.',
    },
  ];

  const team = [
    {
      name: 'John Smith',
      role: 'Chief Executive Officer',
      image: 'https://via.placeholder.com/300x300/1890ff/ffffff?text=CEO',
      description: 'Visionary leader with 15+ years in e-commerce'
    },
    {
      name: 'Sarah Johnson',
      role: 'Chief Technology Officer',
      image: 'https://via.placeholder.com/300x300/52c41a/ffffff?text=CTO',
      description: 'Tech innovator driving our platform excellence'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Marketing Officer',
      image: 'https://via.placeholder.com/300x300/fa8c16/ffffff?text=CMO',
      description: 'Marketing strategist connecting brands with customers'
    },
    {
      name: 'Emily Williams',
      role: 'Head of Customer Success',
      image: 'https://via.placeholder.com/300x300/eb2f96/ffffff?text=HCS',
      description: 'Customer advocate ensuring exceptional service'
    },
  ];

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
                title: 'About Us',
              },
            ]}
          />
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1890ff] to-[#096dd9] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About MarketSphere</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-95">
            Connecting buyers and sellers worldwide through innovative technology 
            and exceptional service. Your trusted marketplace for quality products.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-12">
        <Row gutter={[24, 24]}>
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">{stat.icon}</div>
                <Statistic
                  title={<span className="text-gray-600 text-base">{stat.title}</span>}
                  value={stat.value}
                  suffix={stat.suffix}
                  valueStyle={{ color: '#1890ff', fontWeight: 'bold', fontSize: '32px' }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>
                Founded in 2020, MarketSphere began with a simple mission: to create a marketplace 
                where quality meets affordability, and trust is the foundation of every transaction.
              </p>
              <p>
                What started as a small platform with just a handful of vendors has grown into a 
                thriving ecosystem of over 5,000 trusted sellers and 50,000 satisfied customers 
                across 50 countries.
              </p>
              <p>
                We believe in empowering small businesses and connecting them with customers who 
                value quality, authenticity, and excellent service. Every day, we work tirelessly 
                to improve our platform, enhance security, and deliver the best shopping experience.
              </p>
              <p>
                Our commitment to innovation, customer satisfaction, and ethical business practices 
                has made us one of the fastest-growing marketplaces in the industry.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <Row gutter={[32, 32]}>
            {values.map((value, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <div className="text-center">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Meet Our Leadership</h2>
        <Row gutter={[24, 24]}>
          {team.map((member, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card
                hoverable
                cover={
                  <img
                    alt={member.name}
                    src={member.image}
                    className="h-64 object-cover"
                  />
                }
                className="h-full"
              >
                <Card.Meta
                  title={<span className="text-lg font-semibold">{member.name}</span>}
                  description={
                    <div>
                      <p className="text-[#1890ff] font-medium mb-2">{member.role}</p>
                      <p className="text-gray-600">{member.description}</p>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#1890ff] to-[#096dd9] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Growing Community</h2>
          <p className="text-xl mb-8 opacity-95">
            Whether you're a buyer looking for quality products or a seller wanting to 
            grow your business, MarketSphere is the perfect platform for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products">
              <button className="bg-white text-[#1890ff] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg">
                Start Shopping
              </button>
            </Link>
            <Link to="/contact">
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#1890ff] transition-colors text-lg">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <SafetyOutlined className="text-4xl text-[#1890ff] mb-2" />
              <p className="font-semibold text-gray-900">Secure Payments</p>
              <p className="text-sm text-gray-600">SSL Encrypted</p>
            </div>
            <div>
              <CustomerServiceOutlined className="text-4xl text-[#1890ff] mb-2" />
              <p className="font-semibold text-gray-900">24/7 Support</p>
              <p className="text-sm text-gray-600">Always Here to Help</p>
            </div>
            <div>
              <TrophyOutlined className="text-4xl text-[#1890ff] mb-2" />
              <p className="font-semibold text-gray-900">Quality Assured</p>
              <p className="text-sm text-gray-600">Verified Products</p>
            </div>
            <div>
              <ThunderboltOutlined className="text-4xl text-[#1890ff] mb-2" />
              <p className="font-semibold text-gray-900">Fast Delivery</p>
              <p className="text-sm text-gray-600">Quick Shipping</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
