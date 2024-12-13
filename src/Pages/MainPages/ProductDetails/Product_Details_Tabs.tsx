import { Tabs, Typography } from "antd";
import Reviews from "./Reviews";

const { Title, Paragraph } = Typography;

const ProductDetailsTabs = ({ id }: { id: string }) => {
  return (
    <Tabs defaultActiveKey="description" className="mt-16" size="large" animated style={{fontSize:"20px" ,fontWeight:600}}>
      <Tabs.TabPane tab="Description" key="description" >
        <div>
          <Title level={2} className="mb-2 mt-10">
            Product Description
          </Title>
          <Paragraph>
            Welcome to our Camper Shop, where we provide top-quality products
            designed to enhance your outdoor adventures. Whether you're a
            weekend warrior or a seasoned traveler, our wide range of camping
            gear ensures you have everything you need for a comfortable and
            memorable experience in nature.
          </Paragraph>

          <Title level={3} className="mt-4">
            Features
          </Title>
          <ul>
            <li>
              <strong>Durability:</strong> Built to withstand the rigors of
              outdoor use, our products are made from high-quality materials
              that offer longevity and reliability.
            </li>
            <li>
              <strong>Comfort:</strong> Designed with your comfort in mind, our
              gear includes features such as ergonomic designs, cushioned
              supports, and breathable fabrics.
            </li>
            <li>
              <strong>Convenience:</strong> Easy to set up and pack away, our
              gear is designed for hassle-free use, allowing you to spend more
              time enjoying your adventure.
            </li>
          </ul>
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Reviews" key="reviews">
        <Reviews id={id} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Disscusion" key="disscusion">
       <h3 className="">This features available soon.</h3>
      </Tabs.TabPane>
    </Tabs>
  );
};

export default ProductDetailsTabs;
