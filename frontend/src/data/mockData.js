// Mock data for the e-commerce platform
export const categories = [
  { id: 1, name: 'Smartphones', slug: 'smartphones', icon: '📱' },
  { id: 2, name: 'Laptops', slug: 'laptops', icon: '💻' },
  { id: 3, name: 'Headphones', slug: 'headphones', icon: '🎧' },
  { id: 4, name: 'Smartwatches', slug: 'smartwatches', icon: '⌚' },
  { id: 5, name: 'Tablets', slug: 'tablets', icon: '📱' },
  { id: 6, name: 'Gaming', slug: 'gaming', icon: '🎮' }
];

export const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    slug: 'iphone-15-pro-max',
    description: 'Latest iPhone with titanium design, A17 Pro chip, and advanced camera system.',
    price: 1199.99,
    originalPrice: 1299.99,
    discount: 8,
    category: 'smartphones',
    brand: 'Apple',
    rating: 4.8,
    reviewCount: 2847,
    inStock: 15,
    tags: ['5G', 'iOS', 'Pro Camera', 'Titanium'],
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
    ],
    specifications: {
      display: '6.7" Super Retina XDR',
      processor: 'A17 Pro',
      storage: '256GB',
      camera: '48MP + 12MP + 12MP',
      battery: '4441mAh'
    },
    features: ['Face ID', 'Wireless Charging', 'Water Resistant', '5G Ready']
  },
  {
    id: 2,
    name: 'MacBook Pro 16" M3',
    slug: 'macbook-pro-16-m3',
    description: 'Powerhouse laptop with M3 chip, stunning Liquid Retina XDR display.',
    price: 2499.99,
    originalPrice: 2699.99,
    discount: 7,
    category: 'laptops',
    brand: 'Apple',
    rating: 4.9,
    reviewCount: 1234,
    inStock: 8,
    tags: ['M3 Chip', 'macOS', 'Professional', 'Retina Display'],
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'
    ],
    specifications: {
      display: '16.2" Liquid Retina XDR',
      processor: 'Apple M3',
      storage: '512GB SSD',
      memory: '18GB Unified Memory',
      battery: 'Up to 22 hours'
    },
    features: ['Touch ID', 'Force Touch Trackpad', 'Thunderbolt 4', 'Studio-quality mics']
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    description: 'Industry-leading noise canceling headphones with premium sound quality.',
    price: 399.99,
    originalPrice: 449.99,
    discount: 11,
    category: 'headphones',
    brand: 'Sony',
    rating: 4.7,
    reviewCount: 5678,
    inStock: 25,
    tags: ['Noise Canceling', 'Wireless', 'Hi-Res Audio', 'Long Battery'],
    images: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'
    ],
    specifications: {
      driver: '30mm Dynamic',
      frequency: '4Hz-40kHz',
      battery: '30 hours',
      weight: '250g',
      connectivity: 'Bluetooth 5.2'
    },
    features: ['Active Noise Cancellation', '360 Reality Audio', 'Quick Charge', 'Multipoint Connection']
  },
  {
    id: 4,
    name: 'Apple Watch Ultra 2',
    slug: 'apple-watch-ultra-2',
    description: 'The most rugged and capable Apple Watch designed for endurance athletes.',
    price: 799.99,
    originalPrice: 849.99,
    discount: 6,
    category: 'smartwatches',
    brand: 'Apple',
    rating: 4.6,
    reviewCount: 987,
    inStock: 12,
    tags: ['Titanium', 'GPS', 'Cellular', 'Fitness'],
    images: [
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500',
      'https://images.unsplash.com/photo-1579586337278-3f436f25d4d9?w=500'
    ],
    specifications: {
      display: '49mm Titanium',
      processor: 'S9 SiP',
      storage: '64GB',
      battery: '36 hours',
      water: '100m Water Resistant'
    },
    features: ['ECG', 'Blood Oxygen', 'Temperature Sensing', 'Crash Detection']
  },
  {
    id: 5,
    name: 'iPad Pro 12.9" M2',
    slug: 'ipad-pro-12-9-m2',
    description: 'Ultimate iPad experience with M2 chip and Liquid Retina XDR display.',
    price: 1099.99,
    originalPrice: 1199.99,
    discount: 8,
    category: 'tablets',
    brand: 'Apple',
    rating: 4.8,
    reviewCount: 1876,
    inStock: 18,
    tags: ['M2 Chip', 'Pro Display', 'Apple Pencil', 'iPadOS'],
    images: [
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500'
    ],
    specifications: {
      display: '12.9" Liquid Retina XDR',
      processor: 'Apple M2',
      storage: '256GB',
      camera: '12MP + 10MP',
      connectivity: 'Wi-Fi 6E + 5G'
    },
    features: ['Face ID', 'Apple Pencil Support', 'Magic Keyboard Compatible', 'ProRes Video']
  },
  {
    id: 6,
    name: 'PlayStation 5 Console',
    slug: 'playstation-5-console',
    description: 'Next-gen gaming console with lightning-fast loading and immersive gameplay.',
    price: 499.99,
    originalPrice: 549.99,
    discount: 9,
    category: 'gaming',
    brand: 'Sony',
    rating: 4.5,
    reviewCount: 3456,
    inStock: 5,
    tags: ['4K Gaming', 'Ray Tracing', 'SSD', 'DualSense'],
    images: [
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500'
    ],
    specifications: {
      processor: 'AMD Zen 2',
      gpu: 'AMD RDNA 2',
      storage: '825GB SSD',
      memory: '16GB GDDR6',
      resolution: '4K at 60fps'
    },
    features: ['Ray Tracing', '3D Audio', 'Haptic Feedback', 'Backwards Compatibility']
  }
];

export const users = [
  {
    id: 1,
    email: 'admin@store.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    joinDate: '2023-01-15',
    isActive: true
  },
  {
    id: 2,
    email: 'john.doe@email.com',
    name: 'John Doe',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    joinDate: '2024-03-20',
    isActive: true
  },
  {
    id: 3,
    email: 'jane.smith@email.com',
    name: 'Jane Smith',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
    joinDate: '2024-05-10',
    isActive: true
  }
];

export const orders = [
  {
    id: 'ORD-001',
    userId: 2,
    status: 'delivered',
    total: 1599.98,
    items: [
      { productId: 1, quantity: 1, price: 1199.99 },
      { productId: 3, quantity: 1, price: 399.99 }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Tech Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'USA'
    },
    orderDate: '2024-06-01',
    deliveryDate: '2024-06-05',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-002',
    userId: 3,
    status: 'processing',
    total: 2499.99,
    items: [
      { productId: 2, quantity: 1, price: 2499.99 }
    ],
    shippingAddress: {
      name: 'Jane Smith',
      street: '456 Innovation Ave',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
      country: 'USA'
    },
    orderDate: '2024-06-15',
    deliveryDate: null,
    trackingNumber: 'TRK987654321'
  }
];

export const reviews = [
  {
    id: 1,
    productId: 1,
    userId: 2,
    userName: 'John Doe',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 5,
    title: 'Amazing phone!',
    comment: 'The camera quality is incredible and the battery life exceeds expectations. Definitely worth the upgrade.',
    date: '2024-06-10',
    helpful: 45,
    verified: true
  },
  {
    id: 2,
    productId: 1,
    userId: 3,
    userName: 'Jane Smith',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
    rating: 4,
    title: 'Great but expensive',
    comment: 'Love the features and build quality, but the price point is quite high. Overall satisfied with the purchase.',
    date: '2024-06-08',
    helpful: 23,
    verified: true
  },
  {
    id: 3,
    productId: 3,
    userId: 2,
    userName: 'John Doe',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 5,
    title: 'Best noise canceling headphones',
    comment: 'The noise cancellation is phenomenal. Perfect for long flights and office work.',
    date: '2024-06-12',
    helpful: 67,
    verified: true
  }
];

export const wishlistItems = [
  { userId: 2, productId: 2 },
  { userId: 2, productId: 4 },
  { userId: 3, productId: 1 },
  { userId: 3, productId: 5 }
];

// Mock user interactions for recommendation system
export const userInteractions = [
  { userId: 2, productId: 1, action: 'purchase', timestamp: '2024-06-01', rating: 5 },
  { userId: 2, productId: 3, action: 'purchase', timestamp: '2024-06-01', rating: 5 },
  { userId: 2, productId: 2, action: 'view', timestamp: '2024-06-10' },
  { userId: 2, productId: 4, action: 'wishlist', timestamp: '2024-06-08' },
  { userId: 3, productId: 2, action: 'purchase', timestamp: '2024-06-15', rating: 4 },
  { userId: 3, productId: 1, action: 'view', timestamp: '2024-06-12' },
  { userId: 3, productId: 5, action: 'wishlist', timestamp: '2024-06-14' }
];

// Mock analytics data
export const analyticsData = {
  totalSales: 4099.97,
  totalOrders: 2,
  totalProducts: 6,
  totalUsers: 3,
  monthlyRevenue: [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 15200 },
    { month: 'Mar', revenue: 18900 },
    { month: 'Apr', revenue: 22100 },
    { month: 'May', revenue: 19800 },
    { month: 'Jun', revenue: 25600 }
  ],
  topProducts: [
    { name: 'iPhone 15 Pro Max', sales: 45 },
    { name: 'MacBook Pro 16"', sales: 32 },
    { name: 'Sony WH-1000XM5', sales: 28 },
    { name: 'iPad Pro 12.9"', sales: 19 }
  ],
  categoryDistribution: [
    { category: 'Smartphones', percentage: 35 },
    { category: 'Laptops', percentage: 25 },
    { category: 'Headphones', percentage: 20 },
    { category: 'Tablets', percentage: 12 },
    { category: 'Gaming', percentage: 8 }
  ]
};