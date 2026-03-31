# ShopHub Quick Start Guide

Get ShopHub up and running in minutes! This is a lightweight, no-auth e-commerce platform.

## Prerequisites

- Node.js 16.x or higher
- npm or pnpm
- Code editor (VS Code recommended)

## Frontend Setup (2 minutes)

### 1. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 2. Start Development Server
```bash
npm run dev
# or
pnpm dev
```

### 3. Open in Browser
Navigate to `http://localhost:3000`

You'll see:
- Homepage with featured products
- Navigation header with cart counter
- Product browsing and filtering
- Shopping cart management
- Checkout flow

## Explore the Features

### Browse Products
- Click "All Products" in the header to see the full catalog
- Products include images, descriptions, prices, and ratings
- Filter by category or search for specific items

### Add to Cart
- Click "Add to Cart" on any product
- Cart count updates in the header
- Items persist in local storage

### Checkout
- Go to `/cart` to view your cart
- Click "Proceed to Checkout"
- Multi-step checkout with:
  - Shipping information
  - Billing address
  - Payment details
- Order confirmation after completion

## Key Features

✅ **No Authentication Required** - Start shopping immediately
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **Shopping Cart** - Add, remove, and manage items
✅ **Product Browsing** - Browse, filter, and search products
✅ **Checkout Flow** - Multi-step, user-friendly checkout
✅ **Persistent Cart** - Cart saved in local storage

## Project Structure

```
app/
├── page.tsx              # Homepage
├── products/
│   └── page.tsx          # Product listing
├── product/
│   └── [id]/page.tsx     # Product detail
├── cart/
│   └── page.tsx          # Shopping cart
├── checkout/
│   └── page.tsx          # Checkout flow
└── order-confirmation/
    └── page.tsx          # Order confirmation

components/
├── header.tsx            # Navigation header
├── product-card.tsx      # Product card component
└── ui/                   # shadcn/ui components

lib/
├── store.ts              # Zustand cart state
└── utils.ts              # Utility functions
```

## Customization

### Update Products
Edit mock data in `/app/page.tsx` and `/app/products/page.tsx`

### Modify Theme
Update design tokens in `/app/globals.css`

### Change Store Config
Update cart logic in `/lib/store.ts`

## Backend Integration (Optional)

To connect to a real backend:
1. Set API base URL in environment variables
2. Replace mock product data with API calls
3. Update checkout to call order creation endpoint

See `API_INTEGRATION.md` for detailed instructions.

## Available Routes

- `/` - Homepage
- `/products` - All products
- `/product/[id]` - Product details
- `/cart` - Shopping cart
- `/checkout` - Checkout flow
- `/order-confirmation` - Order confirmation
- `/login` - Info page (no auth needed)

## Next Steps

1. Customize the homepage with your branding
2. Add your own product images and data
3. Connect to a backend API (optional)
4. Deploy to Vercel

Happy shopping! 🛍️
