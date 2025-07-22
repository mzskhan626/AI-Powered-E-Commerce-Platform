import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, User, Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { useApp } from '../../contexts/AppContext';

const Header = () => {
  const { state, dispatch } = useApp();
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    if (query.length > 2) {
      // Generate AI-powered search suggestions
      const suggestions = state.products
        .filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 5)
        .map(product => ({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price
        }));
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleLogin = () => {
    // Mock login - in real app this would show login modal
    const mockUser = state.users.find(u => u.email === 'john.doe@email.com');
    dispatch({ type: 'LOGIN', payload: mockUser });
    dispatch({ type: 'SHOW_AUTH', payload: false });
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TechStore
            </h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products with AI..."
                value={state.searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                  {searchSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="px-4 py-2 hover:bg-accent cursor-pointer flex items-center justify-between"
                      onClick={() => {
                        dispatch({ type: 'SET_SEARCH_QUERY', payload: suggestion.name });
                        setShowSuggestions(false);
                      }}
                    >
                      <div>
                        <div className="font-medium">{suggestion.name}</div>
                        <div className="text-sm text-muted-foreground capitalize">{suggestion.category}</div>
                      </div>
                      <div className="text-sm font-semibold">${suggestion.price}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
              className="hover:scale-110 transition-transform"
            >
              {state.darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* Wishlist */}
            {state.isAuthenticated && (
              <Button variant="ghost" size="icon" className="relative hover:scale-110 transition-transform">
                <Heart className="w-5 h-5" />
                {state.wishlist.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 px-1 min-w-[1.25rem] h-5 flex items-center justify-center text-xs">
                    {state.wishlist.length}
                  </Badge>
                )}
              </Button>
            )}

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:scale-110 transition-transform"
              onClick={() => dispatch({ type: 'SHOW_CART', payload: true })}
            >
              <ShoppingCart className="w-5 h-5" />
              {state.cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 px-1 min-w-[1.25rem] h-5 flex items-center justify-center text-xs">
                  {state.cart.reduce((sum, item) => sum + item.quantity, 0)}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            {state.isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                  {state.currentUser?.name?.charAt(0)}
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="default" size="sm" onClick={handleLogin} className="hover:scale-105 transition-transform">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={state.searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
                className="flex items-center space-x-2"
              >
                {state.darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{state.darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => dispatch({ type: 'SHOW_CART', payload: true })}
                className="flex items-center space-x-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Cart ({state.cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
              </Button>
            </div>

            {state.isAuthenticated ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                    {state.currentUser?.name?.charAt(0)}
                  </div>
                  <span className="text-sm">{state.currentUser?.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start">
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="default" onClick={handleLogin} className="w-full">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;