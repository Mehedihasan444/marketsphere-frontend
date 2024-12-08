export type TShop = {
  id: string;
  name: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  description: string;
  logo: string;
  banner: string;
  vendorId: string;
  products: [];
  isActive: boolean;
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  discount: number;
  id: string;
  images: string[];
  quantity: number;
  rating: number;
  categoryId: string;
  flashSaleId: string;
  shopId: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
