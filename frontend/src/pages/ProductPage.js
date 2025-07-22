import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Heart, ShoppingCart, Star, Share2, Shield, Truck, RotateCcw, 
  Check, Plus, Minus, ChevronLeft, ChevronRight, Zap 
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';
import Reviews from '../components/Reviews';
import { useApp } from '../contexts/AppContext';
import { useToast } from '../hooks/use-toast';

const ProductPage = () => {
  const { slug } = useParams();
  const { state, dispatch } = useApp();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = state.products.find(p => p.slug === slug);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  const isInWishlist = state.wishlist.includes(product.id);
  const isInCart = state.cart.some(item => item.id === product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
    toast({
      title: "Added to cart!",
      description: `${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to your cart.`,
    });
  };

  const handleToggleWishlist = () => {
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

  const relatedProducts = state.products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg bg-accent/20">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
            {product.discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white">
                -{product.discount}% OFF
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/80 hover:bg-white"
              onClick={handleToggleWishlist}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
          
          {/* Thumbnail Images */}
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{product.brand}</Badge>
              <Badge variant="secondary" className="capitalize">{product.category}</Badge>
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground text-lg">{product.description}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-medium">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-primary">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            {product.inStock < 10 && (
              <p className="text-orange-500 font-medium">
                ⚡ Only {product.inStock} left in stock!
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.inStock, quantity + 1))}
                  disabled={quantity >= product.inStock}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                size="lg"
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:scale-105 transition-transform"
                onClick={handleAddToCart}
                disabled={product.inStock === 0}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.inStock === 0 ? 'Out of Stock' : isInCart ? 'Add More' : 'Add to Cart'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => dispatch({ type: 'SHOW_CART', payload: true })}
              >
                <Zap className="w-5 h-5 mr-2" />
                Buy Now
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 p-3 bg-accent/20 rounded-lg">
              <Truck className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-accent/20 rounded-lg">
              <RotateCcw className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">30-Day Returns</span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-accent/20 rounded-lg">
              <Shield className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium">1-Year Warranty</span>
            </div>
          </div>

          {/* Share */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Share:</span>
            <Button variant="ghost" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          
          <TabsContent value="specifications" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="features" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-8">
            <Reviews productId={product.id} />
          </TabsContent>
          
          <TabsContent value="shipping" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium">Free Standard Shipping</div>
                      <div className="text-sm text-muted-foreground">Delivered in 3-5 business days</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="font-medium">Express Shipping ($9.99)</div>
                      <div className="text-sm text-muted-foreground">Delivered in 1-2 business days</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RotateCcw className="w-5 h-5 text-purple-500" />
                    <div>
                      <div className="font-medium">Easy Returns</div>
                      <div className="text-sm text-muted-foreground">30-day return policy</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h4 className="font-medium mb-2">{relatedProduct.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">${relatedProduct.price}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm ml-1">{relatedProduct.rating}</span>
                    </div>
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

export default ProductPage;