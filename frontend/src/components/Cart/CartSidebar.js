import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { useApp } from '../../contexts/AppContext';
import { useToast } from '../../hooks/use-toast';

const CartSidebar = () => {
  const { state, dispatch } = useApp();
  const { toast } = useToast();

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    } else {
      dispatch({ 
        type: 'UPDATE_CART_QUANTITY', 
        payload: { id: productId, quantity: newQuantity }
      });
    }
  };

  const handleCheckout = () => {
    if (!state.isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to proceed with checkout.",
        variant: "destructive"
      });
      return;
    }

    // Mock checkout process
    const mockShippingAddress = {
      name: state.currentUser.name,
      street: '123 Tech Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'USA'
    };

    dispatch({ 
      type: 'PLACE_ORDER', 
      payload: { shippingAddress: mockShippingAddress }
    });

    toast({
      title: "Order placed successfully!",
      description: `Order total: $${state.cartTotal.toFixed(2)}. You'll receive a confirmation email shortly.`,
    });

    dispatch({ type: 'SHOW_CART', payload: false });
  };

  if (!state.showCart) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => dispatch({ type: 'SHOW_CART', payload: false })}
      />
      
      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background border-l shadow-2xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Shopping Cart</h2>
              <Badge variant="secondary">
                {state.cart.reduce((sum, item) => sum + item.quantity, 0)}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch({ type: 'SHOW_CART', payload: false })}
              className="hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Cart Items */}
          {state.cart.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-medium">Your cart is empty</h3>
                <p className="text-muted-foreground">Add some products to get started!</p>
                <Button 
                  onClick={() => dispatch({ type: 'SHOW_CART', payload: false })}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Items List */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {state.cart.map((item) => (
                    <div key={item.id} className="group">
                      <div className="flex space-x-4 p-4 rounded-lg border hover:shadow-md transition-shadow">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1 space-y-2">
                          <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.brand}</p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="w-8 h-8"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="w-8 h-8"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.inStock}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-destructive hover:bg-destructive hover:text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleUpdateQuantity(item.id, 0)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          {/* Price */}
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold text-primary">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ${item.price} each
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Footer with Total and Checkout */}
              <div className="border-t p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${state.cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${(state.cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${(state.cartTotal * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 hover:scale-105 transition-transform"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => dispatch({ type: 'SHOW_CART', payload: false })}
                  >
                    Continue Shopping
                  </Button>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>Secure checkout with 256-bit SSL encryption</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;