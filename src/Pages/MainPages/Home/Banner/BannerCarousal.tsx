import React from "react";
import { Carousel } from "antd";

const BannerCarousal: React.FC = () => (
  <Carousel autoplay arrows infinite={true} className="h-[362px] sm:sm:rounded-md ">
    <div className="h-[362px] sm:rounded-md">
      <img
        src="https://i.ibb.co.com/vxd9HQh/1212-e1733902486349.jpg"
        alt=""
        className="object-cover h-full w-full rounded-md "
      />
    </div>
    <div className="h-[362px] rounded-md">
      <img
        src="https://i.ibb.co.com/37x09cT/macbookprom3.jpg"
        alt=""
        className="object-cover h-full w-full rounded-md"
      />
    </div>
    <div className="h-[362px] rounded-md">
      <img
        src="https://i.ibb.co.com/dW4Y3HJ/Iphone-16-searise-1.jpg"
        alt=""
        className="object-cover h-full w-full sm:rounded-md"
      />
    </div>
    <div className="h-[362px] sm:rounded-md">
      <img
        src="https://img.freepik.com/premium-psd/smartphone-sale-banner-template_185005-374.jpg?semt=ais_hybrid"
        alt=""
        className="object-cover h-full w-full sm:rounded-md"
      />
    </div>
  </Carousel>
);

export default BannerCarousal;


