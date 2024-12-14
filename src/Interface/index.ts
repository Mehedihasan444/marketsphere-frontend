// Enums
export enum Role {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  VENDOR = 'VENDOR',
  CUSTOMER = 'CUSTOMER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  DELETED = 'DELETED',
  SUSPENDED = 'SUSPENDED',
}

export enum OrderStatus {
  CONFIRMED = 'CONFIRMED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  SHIPPED = 'SHIPPED',
  PENDING = 'PENDING',
}

export enum BecomeVendorRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum ShopStatus {
  ACTIVE = 'ACTIVE',
  RESTRICTED = 'RESTRICTED',
  DELETED = 'DELETED',
  SUSPENDED = 'SUSPENDED',
}

// Types for models
export enum TransactionMethod {
  CASH_ON_DELIVERY='CASH_ON_DELIVERY',
  CREDIT_CARD='CREDIT_CARD',
  DEBIT_CARD='DEBIT_CARD',
  NET_BANKING='NET_BANKING',
  UPI='UPI',
}

enum TransactionStatus {
  PENDING="PENDING",
  SUCCESS="SUCCESS",
  FAILED="FAILED",
}

export type TTransaction= {
  id:            string            
  orderId:       string
  order:         TOrder            
  amount:        number
  transactionId: string
  status:        TransactionStatus 
  method:        TransactionMethod 
  createdAt:     Date         
  updatedAt:     Date         

}

export type TUser = {
  id: string;
  email: string;
  name: string;
  password: string;
  role: Role;
  status: UserStatus;
  needPasswordChange: boolean;
  passwordChangedAt?: Date;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  admin?: TAdmin;
  customer?: TCustomer;
  vendor?: TVendor;
};

export type TAdmin = {
  id: string;
  name: string;
  email: string;
  profilePhoto: string;
  phone: string;
  address: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  adminDashboard: TAdminDashboard[];
};

export type TAdminDashboard = {
  id: string;
  adminId: string;
  totalUsers: number;
  totalVendors: number;
  totalCustomers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalCategories: number;
  totalShops: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TCustomer = {
  id: string;
  name: string;
  email: string;
  profilePhoto: string;
  phone: string;
  address: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  order: TOrder[];
  cart: TCart[];
  follow: TFollow[];
  customerDashboard: TCustomerDashboard[];
  wishlist: TWishlist[];
  reviewItems: TReviewItem[];
};

export type TCustomerDashboard = {
  id: string;
  customerId: string;
  totalOrders: number;
  totalSpent: number;
  totalSaved: number;
  totalReviews: number;
  totalFollows: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TVendor = {
  id: string;
  name: string;
  email: string;
  profilePhoto: string;
  phone: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  shop: TShop[];
  vendorDashboard: TVendorDashboard[];
};

export type TVendorDashboard = {
  id: string;
  vendorId: string;
  totalOrders: number;
  totalEarnings: number;
  totalProducts: number;
  totalReviews: number;
  averageRating: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TShop = {
  id: string;
  name: string;
  description: string;
  logo: string;
  banner: string;
  status: ShopStatus;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  vendorId: string;
  vendor: TVendor;
  products: TProduct[];
  followers: TFollow[];
  reviews: TReview[];
  order: TOrder[];
  coupon: TCoupon[];
};

export type TCategory = {
  id: string;
  name: string;
  description: string;
  image?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  products: TProduct[];
};

export type TProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  discount: number;
  quantity: number;
  rating: number;
  categoryId: string;
  category: TCategory;
  flashSaleId?: string;
  flashSale?: TFlashSale;
  shopId: string;
  shop: TShop;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  cartItems: TCartItem[];
  orderItems: TOrderItem[];
  reviews: TReview[];
  wishlistItem: TWishlistItem[];
};

export type TFlashSale = {
  id: string;
  name: string;
  description: string;
  image: string;
  discount: number;
  startDateTime: Date;
  endDateTime: Date;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  product: TProduct[];
};

export type TReview = {
  id: string;
  productId: string;
  product: TProduct;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  shopId: string;
  shop: TShop;
  reviewItems: TReviewItem[];
};

export type TReviewItem = {
  id: string;
  reviewId: string;
  review: TReview;
  customerId: string;
  customer: TCustomer;
  rating: number;
  comment: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TCart = {
  id: string;
  customerId: string;
  customer: TCustomer;
  cartItems: TCartItem[];
  createdAt: Date;
  updatedAt: Date;
};

export type TCartItem = {
  id: string;
  cartId: string;
  cart: TCart;
  productId: string;
  product: TProduct;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TWishlist = {
  id: string;
  customerId: string;
  customer: TCustomer;
  createdAt: Date;
  updatedAt: Date;
  wishlistItem: TWishlistItem[];
};

export type TWishlistItem = {
  id: string;
  wishlistId: string;
  wishlist: TWishlist;
  productId: string;
  product: TProduct;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TFollow = {
  id: string;
  customerId: string;
  customer: TCustomer;
  shopId: string;
  shop: TShop;
  createdAt: Date;
  updatedAt: Date;
};

export type TOrder = {
  id: string;
  customerId: string;
  customer: TCustomer;
  shopId: string;
  shop: TShop;
  vendorId: string;
  vendor: TVendor;
  quantity: number;
  totalAmount: number;
  discount: number;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: string;
  orderShippingType: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  note?: string;
  appliedCoupon?: string;
  terms: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  orderItems: TOrderItem[];
  couponItem?: TCouponItem;
  transaction?: TTransaction;
};

export type TOrderItem = {
  id: string;
  orderId: string;
  order: TOrder;
  productId: string;
  product: TProduct;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TCoupon = {
  id: string;
  shopId: string;
  shop: TShop;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  couponItem: TCouponItem[];
};

export type TCouponItem = {
  id: string;
  discount: number;
  expiryDate: Date;
  couponId: string;
  coupon: TCoupon;
  orderId?: string;
  order?: TOrder;
  code: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TBecomeVendorRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  reason: string;
  status: BecomeVendorRequestStatus;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
