import React, { useState } from 'react';
import { 
  Package, Truck, MapPin, Clock, CheckCircle, 
  AlertCircle, Search, Calendar, User, Phone, Mail 
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useApp } from '../contexts/AppContext';

const OrderStatusIcon = ({ status }) => {
  switch (status) {
    case 'delivered':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'shipped':
      return <Truck className="w-5 h-5 text-blue-500" />;
    case 'processing':
      return <Clock className="w-5 h-5 text-yellow-500" />;
    case 'cancelled':
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    default:
      return <Package className="w-5 h-5 text-gray-500" />;
  }
};

const OrderCard = ({ order, products, user }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'default';
      case 'shipped': return 'secondary';
      case 'processing': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getTrackingSteps = (status) => {
    const steps = [
      { id: 'placed', label: 'Order Placed', completed: true },
      { id: 'processing', label: 'Processing', completed: status !== 'cancelled' },
      { id: 'shipped', label: 'Shipped', completed: status === 'delivered' || status === 'shipped' },
      { id: 'delivered', label: 'Delivered', completed: status === 'delivered' }
    ];
    return steps;
  };

  const orderItems = order.items.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  });

  return (
    <Card className="mb-6 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <OrderStatusIcon status={order.status} />
            <span>Order {order.id}</span>
          </CardTitle>
          <Badge variant={getStatusColor(order.status)} className="capitalize">
            {order.status}
          </Badge>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>Placed on {order.orderDate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Package className="w-4 h-4" />
            <span>Tracking: {order.trackingNumber}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Tracking Progress */}
        <div className="space-y-4">
          <h4 className="font-medium">Order Progress</h4>
          <div className="flex items-center justify-between">
            {getTrackingSteps(order.status).map((step, index) => (
              <div key={step.id} className="flex flex-col items-center space-y-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step.completed 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'border-muted-foreground text-muted-foreground'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-xs">{index + 1}</span>
                  )}
                </div>
                <span className="text-xs text-center">{step.label}</span>
                {index < getTrackingSteps(order.status).length - 1 && (
                  <div className={`absolute w-16 h-0.5 translate-x-8 ${
                    step.completed ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Order Items */}
        <div className="space-y-4">
          <h4 className="font-medium">Items ({order.items.length})</h4>
          <div className="space-y-3">
            {orderItems.map((item) => (
              <div key={item.productId} className="flex items-center space-x-4 p-3 bg-accent/20 rounded-lg">
                <img
                  src={item.product?.images[0]}
                  alt={item.product?.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h5 className="font-medium">{item.product?.name}</h5>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity} × ${item.price}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Shipping Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="font-medium flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Shipping Address</span>
            </h4>
            <div className="text-sm text-muted-foreground">
              <p>{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Order Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(order.total * 0.08).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${(order.total * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        {order.deliveryDate && (
          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <div className="flex items-center space-x-2 text-green-700 dark:text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">
                Delivered on {order.deliveryDate}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button variant="outline" size="sm">
            <Package className="w-4 h-4 mr-2" />
            Track Package
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
          {order.status === 'delivered' && (
            <Button variant="outline" size="sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Leave Review
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const OrderTracking = () => {
  const { state } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  if (!state.isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Login Required</h3>
        <p className="text-muted-foreground mb-4">
          Please log in to view your order history and track your packages.
        </p>
        <Button 
          onClick={() => {
            // Mock login
            const mockUser = state.users.find(u => u.email === 'john.doe@email.com');
            state.dispatch({ type: 'LOGIN', payload: mockUser });
          }}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          Login to Continue
        </Button>
      </div>
    );
  }

  const userOrders = state.orders.filter(order => order.userId === state.currentUser.id);
  
  const filteredOrders = userOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Order Tracking
        </h1>
        <p className="text-muted-foreground">
          Track your orders and view delivery status
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by order ID or tracking number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2">
          {['all', 'processing', 'shipped', 'delivered'].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className="capitalize"
            >
              {status === 'all' ? 'All Orders' : status}
            </Button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No orders found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || statusFilter !== 'all' 
                ? 'No orders match your search criteria.' 
                : "You haven't placed any orders yet."}
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
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              products={state.products}
              user={state.currentUser}
            />
          ))}
        </div>
      )}

      {/* Support Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>Need Help?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <Phone className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Call Support</h4>
              <p className="text-sm text-muted-foreground">1-800-TECHSTORE</p>
            </div>
            <div className="text-center p-4">
              <Mail className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Email Support</h4>
              <p className="text-sm text-muted-foreground">support@techstore.com</p>
            </div>
            <div className="text-center p-4">
              <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <h4 className="font-medium mb-1">Support Hours</h4>
              <p className="text-sm text-muted-foreground">Mon-Fri 9AM-6PM EST</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderTracking;