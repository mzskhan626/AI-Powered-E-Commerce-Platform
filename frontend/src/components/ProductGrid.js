import React from 'react';
import { Heart, ShoppingCart, Star, Eye, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { useApp } from '../contexts/AppContext';
import { useToast } from '../hooks/use-toast';

const ProductCard = ({ product }) => {
  const { state, dispatch } = useApp();
  const { toast } = useToast();
  const isInWishlist = state.wishlist.includes(product.id);
  const isInCart = state.cart.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    if (!state.isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to add items to your wishlist.",
        variant: "destructive"
      });
      return;
    }
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product.id });
    toast({
      title: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isInWishlist ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Card className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-background to-background/50">
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
            -{discountPercentage}%
          </Badge>
        )}
        
        {/* Trending Badge */}
        {product.rating > 4.5 && (
          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Hot
          </Badge>
        )}

        {/* Overlay with Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full hover:scale-110 transition-transform"
              onClick={handleToggleWishlist}
            >
              <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full hover:scale-110 transition-transform"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className={`rounded-full hover:scale-110 transition-transform ${isInCart ? 'bg-green-500 hover:bg-green-600' : ''}`}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Brand & Category */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {product.brand}
          </Badge>
          <Badge variant="secondary" className="text-xs capitalize">
            {product.category}
          </Badge>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">
                ${product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            {product.inStock < 10 && (
              <p className="text-xs text-orange-500 font-medium">
                Only {product.inStock} left!
              </p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {product.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 hover:scale-105 transition-transform"
          onClick={handleAddToCart}
          disabled={product.inStock === 0}
        >
          {product.inStock === 0 ? 'Out of Stock' : isInCart ? 'In Cart' : 'Add to Cart'}
        </Button>
      </CardContent>
    </Card>
  );
};

const ProductGrid = () => {
  const { state } = useApp();

  if (state.filteredProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <Eye className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {state.searchQuery ? 'Search Results' : 'Featured Products'}
        </h2>
        <p className="text-muted-foreground">
          {state.filteredProducts.length} product{state.filteredProducts.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {state.filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;