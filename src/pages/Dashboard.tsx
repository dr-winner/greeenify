import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProfileHeader from '@/components/dashboard/ProfileHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import ProfileForm from '@/components/dashboard/ProfileForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile } from '@/types/user';
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState({});
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    // Fetch user profile
    fetchUserProfile(token);
  }, [navigate]);
  
  const fetchUserProfile = (token: string) => {
    setIsLoading(true);
    
    fetch('https://api.yourbackend.com/api/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      return response.json();
    })
    .then(data => {
      setUserProfile(data.profile);
      setStats(data.stats);
      setIsLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to load profile. Please try again.",
        variant: "destructive",
      });
    });
  };
  
  const handleSaveProfile = (updatedProfile: Partial<UserProfile>) => {
    const token = localStorage.getItem('auth_token');
    
    if (!token || !userProfile) {
      toast({
        title: "Error",
        description: "You must be logged in to update your profile.",
        variant: "destructive",
      });
      return;
    }
    
    fetch('https://api.yourbackend.com/api/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProfile),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      return response.json();
    })
    .then(data => {
      setUserProfile({...userProfile, ...updatedProfile});
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    })
    .catch(error => {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    });
  };
  
  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">Loading your profile...</p>
        </div>
      </Layout>
    );
  }
  
  // Error state
  if (error || !userProfile) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-red-500">
            {error || "Unable to load profile. Please try again."}
          </p>
        </div>
      </Layout>
    );
  }
  
  const isFarmer = userProfile.role === 'farmer';
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
        
        {isEditing ? (
          <ProfileForm 
            userProfile={userProfile} 
            onSave={handleSaveProfile}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <ProfileHeader 
              userProfile={userProfile} 
              onEdit={() => setIsEditing(true)} 
            />
            
            <DashboardStats userProfile={userProfile} stats={stats} />
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                {isFarmer ? (
                  <>
                    <TabsTrigger value="products">My Products</TabsTrigger>
                    <TabsTrigger value="orders">Received Orders</TabsTrigger>
                    <TabsTrigger value="earnings">Earnings</TabsTrigger>
                  </>
                ) : (
                  <>
                    <TabsTrigger value="orders">My Orders</TabsTrigger>
                    <TabsTrigger value="favorites">Favorites</TabsTrigger>
                    <TabsTrigger value="addresses">Saved Addresses</TabsTrigger>
                  </>
                )}
              </TabsList>
              
              <TabsContent value="overview">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Welcome, {userProfile.displayName}!</h2>
                  <p className="mb-4">
                    {isFarmer 
                      ? "Manage your farm products, track orders, and grow your business with Greenify." 
                      : "Find fresh produce directly from local farmers, manage your orders, and more."}
                  </p>
                  <p>
                    {isFarmer
                      ? "Use the tabs above to manage your products, view orders from customers, and track your earnings."
                      : "Use the tabs above to view your order history, favorite products, and saved delivery addresses."}
                  </p>
                </div>
              </TabsContent>
              
              {/* Other tab contents would be implemented here */}
              <TabsContent value="orders">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    {isFarmer ? "Orders from Customers" : "Your Orders"}
                  </h2>
                  <p className="text-gray-500">
                    {isFarmer 
                      ? "No orders have been placed for your products yet." 
                      : "You haven't placed any orders yet."}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
