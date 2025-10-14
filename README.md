# Multi-Vendor E-Commerce Application

## Overview

The E-Commerce Application is designed to provide a seamless online shopping experience for users (customers), vendors, and administrators. The platform allows customers to browse and purchase products, vendors to manage their shops and inventory, and administrators to oversee the entire system. The application is built using modern web technologies, ensuring scalability, performance, and security.

### Technologies Used:
- **Backend**: Node.js, Express.js
- **Frontend**: React.js (or Next.js)
- **Database**: PostgreSQL (with Prisma) or MongoDB (with Mongoose)
- **Authentication**: JWT-based
- **Image Storage**: Cloud storage integration (e.g., Cloudinary)
- **Payment Gateway**: Aamarpay or Stripe
- **State Management**: Redux or Context API (for React)

## Table of Contents

- [Roles and Responsibilities](#roles-and-responsibilities)
  - [Admin](#admin)
  - [Vendor](#vendor)
  - [User (Customer)](#user-customer)
- [Features and Functionalities](#features-and-functionalities)
  - [Home Page](#home-page)
  - [Product Details Page](#product-details-page)
  - [Shop Page](#shop-page)
  - [Cart Functionality](#cart-functionality)
  - [Checkout](#checkout)
  - [Order History](#order-history)
  - [Authentication](#authentication)
  - [Vendor Dashboard](#vendor-dashboard)
  - [Recent Products Page](#recent-products-page)
  - [Comparison Feature](#comparison-feature)
  - [Responsive Design](#responsive-design)
  - [Scalability](#scalability)
- [Technical Requirements](#technical-requirements)
  - [Backend](#backend)
  - [Frontend](#frontend)

## Roles and Responsibilities

### Admin
- Full control over the platform, including monitoring and moderation.
- Manage users (vendors and customers) with the ability to suspend or delete accounts.
- Blacklist vendor shops to restrict their operations.
- Dynamically manage product categories (add, edit, delete categories).
- Monitor transactions and review activities across the platform.

### Vendor
- Create and manage their shop (name, logo, description, etc.).
- Add products with attributes such as name, price, category, inventory count, images, and discounts.
- Duplicate existing products and edit their details for quicker additions.
- View customer reviews and ratings.
- Manage product inventory (update quantity, edit details, or delete products).
- View order history specific to their shop.

### User (Customer)
- Browse products across all vendor shops from the home page.
- Use advanced filtering and searching (price range, category, keyword, etc.).
- Add products to the cart from either the homepage or individual shop pages.
- Purchase products and apply coupon codes during checkout for discounts.
- Compare up to three products at a time based on their attributes.
- Leave reviews and ratings for purchased products (Only after purchase).
- Access order history to view past purchases.
- Follow specific vendor shops to prioritize their products in the listing.
- View a "Recent Products" page showing the last 10 products they viewed.
- Receive a warning if attempting to add products from multiple vendors in the cart, with options:
  - Replace the cart with the new product(s).
  - Retain the current cart and cancel the addition.

## Features and Functionalities

### Home Page
- Display all available products from various vendors.
- Prioritize products from followed shops for logged-in users.
- Infinite scrolling for product listing.
- Filtering and searching functionalities (price range, category, keyword, etc.).
- Scroll-to-top button for better navigation.
- Display a list of categories. When a category is clicked, redirect the user to the "All Products" page and automatically filter the products to show only those belonging to the selected category.
- Show flash sale products and add a button at the bottom. After clicking the button, redirect to the flash sale page and display all flash sale products.

### Product Details Page
- Product name, price, category, images, and detailed descriptions.
- Display the shop name with a clickable link redirecting to the shop page.
- Related products section showing products in the same category.
- Customer reviews and ratings for the product.

### Shop Page
- Vendor’s shop name and details.
- List of products belonging to the vendor only.
- Option for customers to add products directly to the cart from the shop page.
- Option for users to follow or unfollow the shop.
- Follower count.

### Cart Functionality
- Products can only be added from one vendor at a time.
- If attempting to add products from another vendor, show a warning with options:
  - Replace the cart with the new product(s).
  - Retain the current cart and cancel the addition.
- Display product details, pricing, and total cost in the cart.

### Checkout
- Apply coupon codes for discounts during checkout.
- Integrate Aamarpay or Stripe for payment processing.

### Order History
- **For Vendors**: View a detailed list of all orders placed for their shop.
- **For Customers**: View their purchase history with product and order details.

### Authentication
- **Signup Page**: Option to register as a user or vendor.
  - If a vendor is selected, redirect them to the dashboard to add their shop name and some initial products.
- **Login Page**: Secure login using JWT.
  - Password Management: Change password after logging in.
  - Reset password functionality via email.

### Vendor Dashboard
- Manage shop information (name, logo, etc.).
- Add, edit, duplicate, or delete products.
- View and respond to customer reviews.
- Paginated lists for added products and order history.

### Recent Products Page
- Display the last 10 products viewed by the user.
- Include product details, prices, and direct links to the product page.

### Comparison Feature
- Allow users to compare up to three products, but only if the products are from the same category. Comparison will be based on attributes such as price, category, ratings, and other relevant details.
- If a user attempts to add a product from a different category for comparison, display a warning message indicating that only products from the same category can be compared.

### Responsive Design
- Mobile and desktop-friendly interface for all users.

### Scalability
- Implement paginated APIs for any list-based data to ensure scalability and performance. This includes, but is not limited to:
  - **Order History**: For both vendors and customers, paginate the order history to display a limited number of orders per page. Include options to navigate between pages (e.g., next, previous, or specific page numbers).
  - **Product Listings**: On the homepage, shop page, and "All Products" page, paginate product listings to handle large datasets efficiently.
  - Pagination should work seamlessly with filters and search functionality.

## Technical Requirements

### Backend
- **Authentication**: JWT-based authentication.
- **Database**: Relational database PostgreSQL with Prisma or MongoDB with Mongoose.
- **Server**: Node.js with Express for handling APIs. Typescript is optional but highly encouraged.
- **Image Uploads**: Cloud storage integration for product images (e.g., Cloudinary).

### Frontend
- **Framework**: React.js or Next.js with state management using Redux or Context API. Typescript is optional but highly encouraged.

## How to Get Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mehedihasan444/marketsphere-frontend.git
   cd e-commerce-app-forntend
   
   git clone https://github.com/Mehedihasan444/marketsphere-backend.git
   cd e-commerce-app-backend



## Installation Instructions

### Install Dependencies:

#### Backend:

```bash
cd backend
npm install

#### Frontend:

```bash
cd frontend
npm install

#### Forntend
 npm start

 #### Backend
 npm run start

Set up the Environment:

    Create .env files for both the backend and frontend with the appropriate configuration (e.g., database credentials, JWT secret, Cloudinary credentials, etc.).

Run the Application:


npm start


License

This project is licensed under the MIT License - see the LICENSE file for details.

This markdown provides instructions on how to install dependencies, set up the environment, run the application, and contribute to the project. It also includes information about the project's license.
