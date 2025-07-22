import React from 'react';
import { Heart, ShoppingCart, Trash2, Star, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { useApp } from '../contexts/AppContext';
import { useToast } from '../hooks/use-toast';

const WishlistItem = ({ product }) => {
  const { state, dispatch } = useApp();
  const { toast } = useToast();
  const isInCart = state.cart.some(item => item.id === product.id);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleRemoveFromWishlist = () => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product.id });
    toast({
      title: "Removed from wishlist",
      description: `${product.name} has been removed from your wishlist.`,
    });
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex space-x-4">
          <div className="relative">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            {product.discount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs">
                -{product.discount}%
              </Badge>
            )}
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.brand}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveFromWishlist}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
            
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
            
            <div className="flex items-center justify-between">
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
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.share?.({
                      title: product.name,
                      text: product.description,
                      url: window.location.origin + '/product/' + product.slug,
                    });
                  }}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  disabled={product.inStock === 0}
                  className={`${
                    isInCart 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                  } text-white`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.inStock === 0 ? 'Out of Stock' : isInCart ? 'In Cart' : 'Add to Cart'}
                </Button>
              </div>
            </div>
            
            {product.inStock < 10 && product.inStock > 0 && (
              <p className="text-sm text-orange-500 font-medium">
                ⚡ Only {product.inStock} left in stock!
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Wishlist = () => {
  const { state, dispatch } = useApp();
  const { toast } = useToast();

  if (!state.isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Login Required</h3>
        <p className="text-muted-foreground mb-4">
          Please log in to view and manage your wishlist.
        </p>
        <Button 
          onClick={() => {
            // Mock login
            const mockUser = state.users.find(u => u.email === 'john.doe@email.com');
            dispatch({ type: 'LOGIN', payload: mockUser });
          }}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          Login to Continue
        </Button>
      </div>
    );
  }

  const wishlistProducts = state.products.filter(product => 
    state.wishlist.includes(product.id)
  );

  const handleAddAllToCart = () => {
    let addedCount = 0;
    wishlistProducts.forEach(product => {
      if (product.inStock > 0 && !state.cart.some(item => item.id === product.id)) {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        addedCount++;
      }
    });
    
    if (addedCount > 0) {
      toast({
        title: "Added to cart!",
        description: `${addedCount} item${addedCount > 1 ? 's' : ''} added to your cart.`,
      });
    }
  };

  const handleClearWishlist = () => {
    state.wishlist.forEach(productId => {
      dispatch({ type: 'TOGGLE_WISHLIST', payload: productId });
    });
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
            My Wishlist
          </h1>
          <p className="text-muted-foreground">
            {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} saved for later
          </p>
        </div>
        
        {wishlistProducts.length > 0 && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleClearWishlist}
              className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-950/20"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
            <Button
              onClick={handleAddAllToCart}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add All to Cart
            </Button>
          </div>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-6">
              Start adding products you love to your wishlist and they'll appear here.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {wishlistProducts.map((product) => (
            <WishlistItem key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Recommendations */}
      {wishlistProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {state.products
              .filter(product => 
                !state.wishlist.includes(product.id) && 
                wishlistProducts.some(wp => wp.category === product.category)
              )
              .slice(0, 4)
              .map((product) => (
                <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-md mb-3"
                    />
                    <h4 className="font-medium mb-2">{product.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">${product.price}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          dispatch({ type: 'TOGGLE_WISHLIST', payload: product.id });
                          toast({
                            title: "Added to wishlist",
                            description: `${product.name} has been added to your wishlist.`,
                          });
                        }}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;