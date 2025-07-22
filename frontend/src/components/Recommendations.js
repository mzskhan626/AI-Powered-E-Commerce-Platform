import React from 'react';
import { Heart, ShoppingCart, Star, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useApp } from '../contexts/AppContext';
import { useToast } from '../hooks/use-toast';

const RecommendedProductCard = ({ product, reason }) => {
  const { state, dispatch } = useApp();
  const { toast } = useToast();
  const isInWishlist = state.wishlist.includes(product.id);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product.id });
    toast({
      title: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isInWishlist ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  const getReasonIcon = () => {
    switch (reason) {
      case 'similar_users': return <Users className="w-4 h-4 text-blue-500" />;
      case 'trending': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'category_match': return <Sparkles className="w-4 h-4 text-purple-500" />;
      default: return <Sparkles className="w-4 h-4 text-purple-500" />;
    }
  };

  const getReasonText = () => {
    switch (reason) {
      case 'similar_users': return 'People like you also bought';
      case 'trending': return 'Trending now';
      case 'category_match': return 'Based on your interests';
      default: return 'AI Recommended';
    }
  };

  return (
    <Card className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-background via-background/90 to-accent/20">
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* AI Badge */}
        <Badge className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 flex items-center gap-1">
          {getReasonIcon()}
          AI
        </Badge>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="w-8 h-8 rounded-full hover:scale-110 transition-transform"
            onClick={handleToggleWishlist}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Reason */}
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          {getReasonIcon()}
          <span>{getReasonText()}</span>
        </div>

        {/* Product Name */}
        <h4 className="font-semibold leading-tight group-hover:text-primary transition-colors">
          {product.name}
        </h4>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ${product.price}
          </span>
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 hover:scale-105 transition-transform"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Recommendations = () => {
  const { state } = useApp();

  if (!state.isAuthenticated || state.recommendations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span>AI-Powered Recommendations</span>
            <Badge variant="outline" className="text-xs">
              Personalized for you
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Based on your purchase history and preferences, we think you'll love these products.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.recommendations.map((product, index) => {
              // Assign different reasons based on position
              let reason = 'similar_users';
              if (index % 3 === 1) reason = 'trending';
              if (index % 3 === 2) reason = 'category_match';
              
              return (
                <RecommendedProductCard
                  key={product.id}
                  product={product}
                  reason={reason}
                />
              );
            })}
          </div>

          {/* Feedback Section */}
          <div className="mt-6 p-4 bg-accent/20 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>Help us improve your recommendations</span>
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Rate these suggestions to get better recommendations in the future.
            </p>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="hover:bg-green-500 hover:text-white">
                👍 Great suggestions
              </Button>
              <Button size="sm" variant="outline" className="hover:bg-yellow-500 hover:text-white">
                😐 Could be better
              </Button>
              <Button size="sm" variant="outline" className="hover:bg-red-500 hover:text-white">
                👎 Not interested
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Recommendations;