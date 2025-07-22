import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from './contexts/AppContext';
import { Toaster } from './components/ui/toaster';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import CartSidebar from './components/Cart/CartSidebar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import AdminPanel from './components/AdminPanel';
import OrderTracking from './pages/OrderTracking';
import Wishlist from './pages/Wishlist';

function App() {
  return (
    <AppProvider>
      <div className="App min-h-screen bg-background">
        <BrowserRouter>
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/orders" element={<OrderTracking />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </main>
          <Footer />
          <CartSidebar />
          <Toaster />
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default App;