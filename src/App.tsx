import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/hooks/useCart";
import { AuthProvider } from "@/hooks/useAuthContext";
import { WishlistProvider } from "@/hooks/useWishlist";
import UserFlowController from "./components/user-flow/UserFlowController";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import Farmers from "./pages/Farmers";
import Storage from "./pages/Storage";
import StorageListings from "./pages/StorageListings";
import Transport from "./pages/Transport";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";
import PaymentVerify from "./pages/PaymentVerify";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ChatBot from "./components/chat/ChatBot";
import Wishlist from "@/pages/Wishlist";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Toaster />
              <Sonner />
              <UserFlowController />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={
                  <ProtectedRoute>
                    <Shop />
                  </ProtectedRoute>
                } />
                <Route path="/shop/:category" element={
                  <ProtectedRoute>
                    <Shop />
                  </ProtectedRoute>
                } />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } />
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                <Route path="/orders" element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } />
                <Route path="/payment/verify" element={
                  <ProtectedRoute>
                    <PaymentVerify />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/farmers" element={
                  <ProtectedRoute>
                    <Farmers />
                  </ProtectedRoute>
                } />
                <Route path="/storage" element={
                  <ProtectedRoute>
                    <Storage />
                  </ProtectedRoute>
                } />
                <Route path="/storage-listings" element={
                  <ProtectedRoute>
                    <StorageListings />
                  </ProtectedRoute>
                } />
                <Route path="/transport" element={
                  <ProtectedRoute>
                    <Transport />
                  </ProtectedRoute>
                } />
                <Route path="/wishlist" element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                } />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ChatBot />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
