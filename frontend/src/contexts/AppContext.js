import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { products, users, orders, reviews, wishlistItems, userInteractions } from '../data/mockData';

const AppContext = createContext();

const initialState = {
  // Auth
  currentUser: null,
  isAuthenticated: false,
  
  // Products & Categories
  products: products,
  filteredProducts: products,
  categories: ['smartphones', 'laptops', 'headphones', 'smartwatches', 'tablets', 'gaming'],
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  
  // Cart
  cart: [],
  cartTotal: 0,
  
  // Wishlist
  wishlist: [],
  
  // Reviews
  reviews: reviews,
  
  // Orders
  orders: orders,
  
  // UI State
  darkMode: false,
  showCart: false,
  showAuth: false,
  
  // Admin
  users: users,
  adminStats: {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalUsers: users.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0)
  },
  
  // Recommendations
  userInteractions: userInteractions,
  recommendations: []
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        wishlist: wishlistItems.filter(item => item.userId === action.payload.id).map(item => item.productId)
      };
      
    case 'LOGOUT':
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        cart: [],
        wishlist: []
      };
      
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode
      };
      
    case 'SET_SEARCH_QUERY':
      const filtered = action.payload 
        ? state.products.filter(product => 
            product.name.toLowerCase().includes(action.payload.toLowerCase()) ||
            product.description.toLowerCase().includes(action.payload.toLowerCase()) ||
            product.tags.some(tag => tag.toLowerCase().includes(action.payload.toLowerCase()))
          )
        : state.products;
      return {
        ...state,
        searchQuery: action.payload,
        filteredProducts: filtered
      };
      
    case 'SET_CATEGORY':
      const categoryFiltered = action.payload === 'all' 
        ? state.products 
        : state.products.filter(product => product.category === action.payload);
      return {
        ...state,
        selectedCategory: action.payload,
        filteredProducts: categoryFiltered
      };
      
    case 'SET_SORT':
      let sorted = [...state.filteredProducts];
      switch (action.payload) {
        case 'price-low':
          sorted.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          sorted.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          sorted.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          sorted.sort((a, b) => b.id - a.id);
          break;
        default:
          // Keep original order for 'featured'
          break;
      }
      return {
        ...state,
        sortBy: action.payload,
        filteredProducts: sorted
      };
      
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      let newCart;
      if (existingItem) {
        newCart = state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
      return {
        ...state,
        cart: newCart,
        cartTotal: newCart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };
      
    case 'REMOVE_FROM_CART':
      const updatedCart = state.cart.filter(item => item.id !== action.payload);
      return {
        ...state,
        cart: updatedCart,
        cartTotal: updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };
      
    case 'UPDATE_CART_QUANTITY':
      const modifiedCart = state.cart.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      return {
        ...state,
        cart: modifiedCart,
        cartTotal: modifiedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };
      
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
        cartTotal: 0
      };
      
    case 'TOGGLE_WISHLIST':
      const productId = action.payload;
      const isInWishlist = state.wishlist.includes(productId);
      return {
        ...state,
        wishlist: isInWishlist
          ? state.wishlist.filter(id => id !== productId)
          : [...state.wishlist, productId]
      };
      
    case 'SHOW_CART':
      return {
        ...state,
        showCart: action.payload
      };
      
    case 'SHOW_AUTH':
      return {
        ...state,
        showAuth: action.payload
      };
      
    case 'ADD_REVIEW':
      return {
        ...state,
        reviews: [...state.reviews, action.payload]
      };
      
    case 'PLACE_ORDER':
      const newOrder = {
        id: `ORD-${Date.now()}`,
        userId: state.currentUser.id,
        status: 'processing',
        total: state.cartTotal,
        items: state.cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: action.payload.shippingAddress,
        orderDate: new Date().toISOString().split('T')[0],
        trackingNumber: `TRK${Date.now()}`
      };
      return {
        ...state,
        orders: [...state.orders, newOrder],
        cart: [],
        cartTotal: 0
      };
      
    case 'SET_RECOMMENDATIONS':
      return {
        ...state,
        recommendations: action.payload
      };
      
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode !== state.darkMode) {
      dispatch({ type: 'TOGGLE_DARK_MODE' });
    }
  }, []);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', state.darkMode);
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  // Generate recommendations when user logs in
  useEffect(() => {
    if (state.isAuthenticated && state.currentUser) {
      generateRecommendations(state.currentUser.id);
    }
  }, [state.isAuthenticated, state.currentUser]);

  const generateRecommendations = (userId) => {
    // Simple collaborative filtering
    const userInteractionsByUser = state.userInteractions.filter(i => i.userId === userId);
    const userProducts = userInteractionsByUser.map(i => i.productId);
    
    // Find similar users based on common products
    const otherUserInteractions = state.userInteractions.filter(i => i.userId !== userId);
    const similarUsers = {};
    
    otherUserInteractions.forEach(interaction => {
      if (userProducts.includes(interaction.productId)) {
        similarUsers[interaction.userId] = (similarUsers[interaction.userId] || 0) + 1;
      }
    });
    
    // Get recommendations from similar users
    const recommendedProductIds = new Set();
    Object.keys(similarUsers).forEach(similarUserId => {
      const similarUserProducts = state.userInteractions
        .filter(i => i.userId === parseInt(similarUserId) && !userProducts.includes(i.productId))
        .map(i => i.productId);
      similarUserProducts.forEach(productId => recommendedProductIds.add(productId));
    });
    
    // Content-based filtering - recommend similar category products
    const userCategories = userProducts.map(productId => 
      state.products.find(p => p.id === productId)?.category
    ).filter(Boolean);
    
    const categoryRecommendations = state.products.filter(product => 
      userCategories.includes(product.category) && !userProducts.includes(product.id)
    );
    
    categoryRecommendations.forEach(product => recommendedProductIds.add(product.id));
    
    // Convert to product objects and limit to 6
    const recommendations = Array.from(recommendedProductIds)
      .map(id => state.products.find(p => p.id === id))
      .filter(Boolean)
      .slice(0, 6);
    
    dispatch({ type: 'SET_RECOMMENDATIONS', payload: recommendations });
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};