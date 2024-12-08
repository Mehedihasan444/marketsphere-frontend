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
}