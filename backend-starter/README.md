# ShopHub Backend

Express.js + MongoDB backend for the ShopHub e-commerce platform.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Update the `MONGODB_URI` with your MongoDB connection string and `JWT_SECRET` with a secure key.

### 3. Run Development Server

```bash
npm run dev
```

The server will start at `http://localhost:5000`

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── models/          # Mongoose schemas
│   ├── User.ts
│   ├── Product.ts
│   └── Order.ts
├── routes/          # API route definitions
│   ├── auth.ts
│   ├── products.ts
│   └── orders.ts
├── controllers/     # Business logic
│   ├── authController.ts
│   ├── productController.ts
│   └── orderController.ts
├── middleware/      # Express middleware
│   └── auth.ts      # JWT authentication
└── index.ts         # Server entry point
```

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "555-1234",
  "addresses": [...]
}
```

### Products

#### Get All Products
```http
GET /api/products?category=Electronics&sortBy=Price: Low to High&page=1&limit=20&search=headphones
```

Query Parameters:
- `category`: Filter by category (Electronics, Accessories, Furniture)
- `sortBy`: Sort by (Newest, Price: Low to High, Price: High to Low, Best Sellers)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `search`: Search query

#### Get Single Product
```http
GET /api/products/{id}
```

#### Create Product (Admin)
```http
POST /api/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "image": "image-url",
  "stock": 50
}
```

#### Update Product (Admin)
```http
PUT /api/products/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 109.99
}
```

#### Delete Product (Admin)
```http
DELETE /api/products/{id}
Authorization: Bearer {token}
```

### Orders

#### Create Order
```http
POST /api/orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "items": [
    {
      "productId": "...",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  },
  "subtotal": 299.99,
  "tax": 24.00,
  "shipping": 0
}
```

#### Get User Orders
```http
GET /api/orders
Authorization: Bearer {token}
```

#### Get Single Order
```http
GET /api/orders/{id}
Authorization: Bearer {token}
```

#### Update Order Status (Admin)
```http
PUT /api/orders/{id}/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "shipped",
  "paymentStatus": "completed"
}
```

#### Get All Orders (Admin)
```http
GET /api/orders/admin/all?status=pending&page=1&limit=20
Authorization: Bearer {token}
```

## Database Models

### User
```typescript
{
  _id: ObjectId
  email: string (unique)
  password: string (hashed)
  name: string
  phone: string
  addresses: [{
    street: string
    city: string
    state: string
    zipCode: string
    isDefault: boolean
  }]
  role: 'user' | 'admin'
  createdAt: Date
  updatedAt: Date
}
```

### Product
```typescript
{
  _id: ObjectId
  name: string
  description: string
  price: number
  category: string
  image: string
  images: [string]
  stock: number
  rating: number
  reviews: number
  features: [string]
  specifications: Map<string, string>
  createdAt: Date
  updatedAt: Date
}
```

### Order
```typescript
{
  _id: ObjectId
  userId: ObjectId (ref: User)
  items: [{
    productId: ObjectId
    name: string
    price: number
    quantity: number
  }]
  shippingAddress: {...}
  total: number
  subtotal: number
  tax: number
  shipping: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  paymentStatus: 'pending' | 'completed' | 'failed'
  createdAt: Date
  updatedAt: Date
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication.

1. User registers or logs in
2. Server returns a JWT token
3. Client stores token in localStorage
4. Client includes token in Authorization header: `Authorization: Bearer {token}`
5. Server verifies token on protected routes

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error message describing what went wrong"
}
```

HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request (validation error)
- 401: Unauthorized (authentication error)
- 403: Forbidden (authorization error)
- 404: Not Found
- 500: Server Error

## Middleware

### Authentication Middleware
Protects routes that require authentication. Add `protect` middleware to routes that need a valid JWT token.

### Authorization Middleware
Checks user role. Add `authorize('admin')` to routes that require admin privileges.

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Role-based access control (RBAC)
- Input validation with Mongoose schemas
- Protected admin-only routes
- CORS configuration
- Environment variable protection

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development, production |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/shophub |
| JWT_SECRET | Secret key for JWT signing | your-secret-key |
| JWT_EXPIRE | Token expiration time | 7d |
| FRONTEND_URL | Frontend application URL | http://localhost:3000 |

## Next Steps

1. Connect MongoDB (local or MongoDB Atlas)
2. Update environment variables in `.env`
3. Run `npm run dev` to start development server
4. Test API endpoints with Postman or similar tool
5. Connect frontend to backend API
6. Deploy backend (Heroku, Railway, Render, etc.)

## Frontend Integration

Update your frontend API calls to use the backend URL:

```typescript
const API_URL = 'http://localhost:5000/api';

// Example: Get products
const response = await fetch(`${API_URL}/products`);
const products = await response.json();

// Example: Login
const response = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
const { token } = await response.json();
localStorage.setItem('token', token);

// Example: Protected request
const response = await fetch(`${API_URL}/orders`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});
```

## Support

For issues or questions, refer to the main [BACKEND_SETUP.md](../BACKEND_SETUP.md) guide or create an issue in the repository.
