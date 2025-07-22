import React, { useState } from 'react';
import {
  Users, Package, ShoppingCart, DollarSign, TrendingUp, Plus,
  Edit, Trash2, Eye, Search, Filter, BarChart3, PieChart
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useApp } from '../contexts/AppContext';
import { analyticsData } from '../data/mockData';

const StatsCard = ({ title, value, change, icon: Icon, trend = 'up' }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-center space-x-2">
            <h3 className="text-2xl font-bold">{value}</h3>
            {change && (
              <Badge variant={trend === 'up' ? 'default' : 'destructive'} className="text-xs">
                {trend === 'up' ? '+' : '-'}{change}%
              </Badge>
            )}
          </div>
        </div>
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const ProductsTab = () => {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProducts = state.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'in-stock' && product.inStock > 0) ||
      (statusFilter === 'low-stock' && product.inStock <= 10 && product.inStock > 0) ||
      (statusFilter === 'out-of-stock' && product.inStock === 0);
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Products Management</h2>
        <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="low-stock">Low Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">{product.brand}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.inStock === 0 ? 'destructive' :
                      product.inStock <= 10 ? 'secondary' : 'default'
                    }
                  >
                    {product.inStock} units
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <span>{product.rating}</span>
                    <span className="text-muted-foreground">({product.reviewCount})</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

const OrdersTab = () => {
  const { state } = useApp();

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'default';
      case 'processing': return 'secondary';
      case 'shipped': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Orders Management</h2>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search orders..." className="w-64" />
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state.orders.map((order) => {
              const customer = state.users.find(u => u.id === order.userId);
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs">
                        {customer?.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{customer?.name}</div>
                        <div className="text-sm text-muted-foreground">{customer?.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(order.status)} className="capitalize">
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

const UsersTab = () => {
  const { state } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Users Management</h2>
        <Input placeholder="Search users..." className="w-64" />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state.users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="capitalize">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>
                  <Badge variant={user.isActive ? 'default' : 'destructive'}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

const AnalyticsTab = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Revenue"
        value={`$${analyticsData.totalSales.toLocaleString()}`}
        change="12.5"
        icon={DollarSign}
      />
      <StatsCard
        title="Total Orders"
        value={analyticsData.totalOrders.toString()}
        change="8.2"
        icon={ShoppingCart}
      />
      <StatsCard
        title="Total Products"
        value={analyticsData.totalProducts.toString()}
        change="5.1"
        icon={Package}
      />
      <StatsCard
        title="Active Users"
        value={analyticsData.totalUsers.toString()}
        change="15.8"
        icon={Users}
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Monthly Revenue</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.monthlyRevenue.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <span className="text-sm">{data.month}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-accent rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{
                        width: `${(data.revenue / Math.max(...analyticsData.monthlyRevenue.map(d => d.revenue))) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">${data.revenue.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="w-5 h-5" />
            <span>Top Products</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{index + 1}</Badge>
                  <span className="text-sm">{product.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-accent rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                      style={{
                        width: `${(product.sales / Math.max(...analyticsData.topProducts.map(p => p.sales))) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">{product.sales}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const AdminPanel = () => {
  const { state } = useApp();

  if (!state.isAuthenticated || state.currentUser?.role !== 'admin') {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Access Denied</h3>
        <p className="text-muted-foreground">
          You need admin privileges to access this panel.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage your e-commerce platform
        </p>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <AnalyticsTab />
        </TabsContent>

        <TabsContent value="products">
          <ProductsTab />
        </TabsContent>

        <TabsContent value="orders">
          <OrdersTab />
        </TabsContent>

        <TabsContent value="users">
          <UsersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;