/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetRecentViewProductsQuery } from "../../../../Redux/Features/RecentViewProducts/recentViewProductsApi";
import {  Row, Col, Spin, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { TProduct } from "../../../../Interface";
import ProductCard from "../../../../Components/Shared/ProductCard";

const { Title, Text } = Typography;

const RecentViewProducts = () => {
    // Fetch recent viewed products
    const { data = [], isLoading } = useGetRecentViewProductsQuery("");
    const  Products  = data?.data || []

    // Custom loading icon
    const loadingIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

    return (
        <div className="p-4 bg-gray-100">
            {/* Page Title */}
            <Title level={2} className="text-center mb-6">
                Recently Viewed Products
            </Title>

            {/* Loading State */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Spin indicator={loadingIcon} />
                </div>
            ) : (
                <Row gutter={[16, 16]} justify="center">
                    {Products?.length > 0 ? (
                        Products?.map((item: any) => (
                            <Col
                                key={item?.product?.id}
                                // xs={24}
                                // sm={12}
                                // md={8}
                                // lg={6}
                                className="flex justify-center"
                            >
                                <ProductCard product={item?.product as TProduct} />
                            </Col>
                        ))
                    ) : (
                        <Col span={24} className="text-center">
                            <Text type="secondary">No recent products available.</Text>
                        </Col>
                    )}
                </Row>
            )}
        </div>
    );
};

export default RecentViewProducts;
