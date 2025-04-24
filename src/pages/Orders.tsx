import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuthContext } from '@/hooks/useAuthContext';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { OrderStatus } from '@/services/firestoreService';
import { ShoppingBag, Package, Truck, CheckCircle, AlertCircle } from 'lucide-react';

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  shippingInfo: {
    fullName: string;
    phoneNumber: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
  };
  deliveryOption: string;
  paymentMethod: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const statusIcons = {
  [OrderStatus.PENDING]: <ShoppingBag className="h-5 w-5 text-yellow-500" />,
  [OrderStatus.PROCESSING]: <Package className="h-5 w-5 text-blue-500" />,
  [OrderStatus.SHIPPED]: <Truck className="h-5 w-5 text-purple-500" />,
  [OrderStatus.DELIVERED]: <CheckCircle className="h-5 w-5 text-green-500" />,
  [OrderStatus.CANCELLED]: <AlertCircle className="h-5 w-5 text-red-500" />
};

const statusLabels = {
  [OrderStatus.PENDING]: 'Pending',
  [OrderStatus.PROCESSING]: 'Processing',
  [OrderStatus.SHIPPED]: 'Shipped',
  [OrderStatus.DELIVERED]: 'Delivered',
  [OrderStatus.CANCELLED]: 'Cancelled'
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId, isAuthenticated } = useAuthContext();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated || !userId) return;
      
      try {
        setLoading(true);
        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef,
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const ordersData: Order[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          ordersData.push({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date()
          } as Order);
        });
        
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [userId, isAuthenticated]);
  
  const getOrdersByStatus = (status: OrderStatus | 'all') => {
    if (status === 'all') return orders;
    return orders.filter(order => order.status === status);
  };
  
  const renderOrderItems = (items: OrderItem[]) => {
    return (
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.productName} 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium">{item.productName}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <p>Qty: {item.quantity}</p>
                <p>₵{item.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderOrderCard = (order: Order) => {
    return (
      <Card key={order.id} className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Order #{order.id.slice(-6)}</CardTitle>
            <div className="flex items-center space-x-1 text-sm">
              {statusIcons[order.status]}
              <span>{statusLabels[order.status]}</span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Placed on {format(order.createdAt, 'MMM dd, yyyy')} at {format(order.createdAt, 'h:mm a')}
          </div>
        </CardHeader>
        <CardContent>
          {renderOrderItems(order.items)}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>₵{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping:</span>
              <span>₵{order.shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium mt-2">
              <span>Total:</span>
              <span>₵{order.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  const renderOrdersContent = (status: OrderStatus | 'all') => {
    const filteredOrders = getOrdersByStatus(status);
    
    if (loading) {
      return Array(3).fill(0).map((_, index) => (
        <Card key={index} className="mb-4">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48 mt-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array(2).fill(0).map((_, itemIndex) => (
                <div key={itemIndex} className="flex items-center space-x-3">
                  <Skeleton className="h-16 w-16 rounded-md" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ));
    }
    
    if (filteredOrders.length === 0) {
      return (
        <div className="text-center py-8">
          <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">No orders found</h3>
          <p className="text-gray-500">
            {status === 'all' 
              ? "You haven't placed any orders yet." 
              : `You don't have any ${statusLabels[status].toLowerCase()} orders.`}
          </p>
        </div>
      );
    }
    
    return filteredOrders.map(order => renderOrderCard(order));
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-bold mb-6">My Orders</h1>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value={OrderStatus.PROCESSING}>Processing</TabsTrigger>
            <TabsTrigger value={OrderStatus.SHIPPED}>Shipped</TabsTrigger>
            <TabsTrigger value={OrderStatus.DELIVERED}>Delivered</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {renderOrdersContent('all')}
          </TabsContent>
          
          <TabsContent value={OrderStatus.PROCESSING}>
            {renderOrdersContent(OrderStatus.PROCESSING)}
          </TabsContent>
          
          <TabsContent value={OrderStatus.SHIPPED}>
            {renderOrdersContent(OrderStatus.SHIPPED)}
          </TabsContent>
          
          <TabsContent value={OrderStatus.DELIVERED}>
            {renderOrdersContent(OrderStatus.DELIVERED)}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Orders;
