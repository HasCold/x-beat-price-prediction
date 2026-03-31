# ShopHub - Modern E-Commerce Platform

A lightweight e-commerce platform with Next.js 16 frontend featuring product browsing, shopping cart, and seamless checkout—no authentication required.

## Overview

ShopHub is a streamlined e-commerce solution with:
- **Frontend**: Next.js 16 with React, TypeScript, Tailwind CSS, and shadcn/ui
- **State Management**: Zustand for lightweight client-side cart management
- **Instant Checkout**: No authentication or account creation needed—users can browse and purchase immediately
- **Responsive Design**: Mobile-first design that works perfectly on all devices

## Project Structure

```
shophub-frontend/
├── app/
│   ├── page.tsx                 # Homepage with featured products
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles & design tokens
│   ├── products/
│   │   └── page.tsx             # Products listing with filters
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx         # Product detail page
│   ├── cart/
│   │   └── page.tsx             # Shopping cart
│   ├── login/
│   │   └── page.tsx             # Login page
│   ├── checkout/
│   │   └── page.tsx             # Multi-step checkout
│   └── order-confirmation/
│       └── page.tsx             # Order confirmation
├── components/
│   ├── header.tsx               # Navigation & header
│   ├── product-card.tsx         # Product card component
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── store.ts                 # Zustand store (cart only)
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
└── package.json
```

## Frontend Setup

### Prerequisites
- Node.js 16.x or higher
- npm or pnpm

### Installation

1. Clone or download the frontend code
2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start development server:
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

### Frontend Features

- **Home Page**: Featured products with hero section and benefits
- **Product Catalog**: Browse all products with filtering and sorting
- **Product Details**: Detailed product view with images, specs, and related products
- **Shopping Cart**: Add/remove items, manage quantities, persistent storage
- **User Authentication**: Login system with JWT tokens
- **Checkout**: Multi-step checkout with shipping and payment info
- **Order Confirmation**: Order summary and confirmation page
- **Responsive Design**: Mobile-first design that works on all devices

## Backend Setup

### Prerequisites
- Node.js 16.x or higher
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Create new directory for backend:
```bash
mkdir shophub-backend
cd shophub-backend
```

2. Copy contents from `backend-starter/` folder to this new directory

3. Install dependencies:
```bash
npm install
```

4. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

5. Update environment variables in `.env`:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/shophub
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

6. Start development server:
```bash
npm run dev
```

Server runs at http://localhost:5000

### Backend API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

#### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

#### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders` - Get user's orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PUT /api/orders/:id/status` - Update order status (admin only)
- `GET /api/orders/admin/all` - Get all orders (admin only)

## Design System

The application uses a modern dark theme with:

**Colors**
- Background: #0a0a0a (deep black)
- Foreground: #fafafa (off-white)
- Primary: #f5f5f5 (white)
- Accent: #ffffff (bright white)
- Borders: #2a2a2a (dark gray)

**Typography**
- Font Family: Geist (default Next.js font)
- Sizes: Semantic scaling from 12px to 32px+
- Line Heights: 1.4-1.6 for body text

**Components**
- Uses shadcn/ui for consistent components
- Custom product cards and layouts
- Responsive grid system

## Key Features Implemented

### Frontend
✅ Homepage with hero and featured products
✅ Product catalog with filtering & sorting
✅ Product detail pages with images & specs
✅ Shopping cart with persistence
✅ Login/authentication UI
✅ Multi-step checkout flow
✅ Order confirmation page
✅ Responsive mobile design
✅ Dark theme design system
✅ Zustand state management

### Backend
✅ Express.js server structure
✅ MongoDB models (User, Product, Order)
✅ JWT authentication with password hashing
✅ Product CRUD operations
✅ Order creation & management
✅ Admin-only routes
✅ Error handling & validation
✅ CORS configuration

## Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Library**: shadcn/ui
- **State Management**: Zustand
- **Icons**: Lucide React
- **Images**: Next.js Image component

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **CORS**: Express CORS

## Development Workflow

### 1. Start Frontend
```bash
cd shophub-frontend
npm run dev
# Runs on http://localhost:3000
```

### 2. Start Backend
```bash
cd shophub-backend
npm run dev
# Runs on http://localhost:5000
```

### 3. Connect Frontend to Backend
Update the backend URL in frontend components and Zustand store actions to point to `http://localhost:5000/api`

## Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Frontend stores token in localStorage
4. Frontend includes token in Authorization header for protected requests
5. Backend middleware verifies token and allows/denies access

## Database Schema

### User
```
- _id
- email (unique)
- password (hashed)
- name
- phone
- addresses (array)
- role (user/admin)
- createdAt, updatedAt
```

### Product
```
- _id
- name, description
- price, category
- image, images (array)
- stock, rating, reviews
- features, specifications
- createdAt, updatedAt
```

### Order
```
- _id
- userId (ref)
- items (array with product refs)
- shippingAddress
- total, subtotal, tax, shipping
- status (pending/processing/shipped/delivered)
- paymentStatus (pending/completed/failed)
- createdAt, updatedAt
```

## Deployment Guide

### Frontend Deployment (Vercel)
1. Push frontend to GitHub
2. Connect GitHub repo to Vercel
3. Set environment variables if needed
4. Deploy with one click

### Backend Deployment

**Option 1: Heroku**
```bash
npm install -g heroku
heroku login
heroku create your-app-name
git push heroku main
```

**Option 2: Railway**
- Connect GitHub repo
- Add MongoDB
- Deploy

**Option 3: Render**
- Connect GitHub repo
- Set environment variables
- Deploy

After deployment, update `FRONTEND_URL` in backend environment variables.

## Environment Variables

### Frontend (.env.local)
```
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://...
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

## Next Steps

1. **Connect Frontend to Backend**
   - Replace mock data with API calls
   - Update store actions to use backend

2. **Setup Database**
   - Create MongoDB Atlas account
   - Create cluster and get connection string
   - Update MONGODB_URI in backend .env

3. **Implement Payment**
   - Integrate Stripe or similar
   - Add payment processing to checkout

4. **Add Features**
   - Email notifications
   - Product reviews
   - Wishlist functionality
   - Admin dashboard

5. **Deploy**
   - Deploy frontend to Vercel
   - Deploy backend to Railway/Render
   - Set up production databases

## Security Considerations

- Passwords are hashed with bcryptjs
- JWT tokens for authentication
- CORS configured for allowed origins
- Input validation on backend
- Environment variables for secrets
- Protected admin routes
- HTTPS recommended for production

## Performance Optimization

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Zustand for efficient state management
- Database indexes for queries
- Caching strategies

## Support & Documentation

- See `BACKEND_SETUP.md` for detailed backend setup
- See `backend-starter/README.md` for API documentation
- Check component files for implementation examples

## License

This project is open source and available under the MIT License.

---

Built with Next.js, React, Express, MongoDB, and Tailwind CSS.
