
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import WelcomeStep from './WelcomeStep';
import ProfileSetupStep from './ProfileSetupStep';
import ServiceSelectionStep from './ServiceSelectionStep';
import { useToast } from "@/components/ui/use-toast";
import { useCart } from '@/hooks/useCart';

export type UserFlowSteps = 'welcome' | 'profile' | 'services' | 'complete';
export type ServiceType = 'marketplace' | 'storage' | 'transport';

export interface UserProfile {
  displayName: string;
  address: string;
  phoneNumber: string;
  preferences: string[];
}

export interface SelectedServices {
  marketplace: boolean;
  storage: boolean;
  transport: boolean;
}

const UserFlowController = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<UserFlowSteps>('welcome');
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    displayName: '',
    address: '',
    phoneNumber: '',
    preferences: []
  });
  const [selectedServices, setSelectedServices] = useState<SelectedServices>({
    marketplace: true,
    storage: false,
    transport: false
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { clearCart } = useCart();
  
  // Check local storage for onboarding status
  useEffect(() => {
    const onboardingCompleted = localStorage.getItem('greenify-onboarding-completed');
    if (!onboardingCompleted) {
      // Open dialog if user hasn't completed onboarding
      setOpen(true);
    } else {
      setIsOnboarded(true);
    }
  }, []);
  
  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    setCurrentStep('services');
    
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully.",
    });
  };
  
  const handleServiceSelection = (services: SelectedServices) => {
    setSelectedServices(services);
    completeOnboarding();
  };
  
  const completeOnboarding = () => {
    // Save onboarding data
    localStorage.setItem('greenify-onboarding-completed', 'true');
    localStorage.setItem('greenify-user-profile', JSON.stringify(profile));
    localStorage.setItem('greenify-selected-services', JSON.stringify(selectedServices));
    
    setIsOnboarded(true);
    
    // Close the dialog
    setOpen(false);
    
    // Show success message
    toast({
      title: "Welcome to Greenify!",
      description: "Your personalized experience is ready.",
    });
    
    // Navigate to the appropriate page based on selected service
    if (selectedServices.marketplace) {
      navigate('/shop');
    } else if (selectedServices.storage) {
      navigate('/storage');
    } else if (selectedServices.transport) {
      navigate('/transport');
    }
  };
  
  const skipOnboarding = () => {
    localStorage.setItem('greenify-onboarding-completed', 'true');
    setOpen(false);
    
    // Show skip message
    toast({
      title: "Onboarding skipped",
      description: "You can complete your profile anytime from your account settings.",
      variant: "default",
    });
  };
  
  // Reset onboarding for testing purposes
  const resetOnboarding = () => {
    localStorage.removeItem('greenify-onboarding-completed');
    localStorage.removeItem('greenify-user-profile');
    localStorage.removeItem('greenify-selected-services');
    clearCart();
    setIsOnboarded(false);
    setCurrentStep('welcome');
    setOpen(true);
    
    toast({
      title: "Onboarding reset",
      description: "Your onboarding process has been reset.",
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-2 bg-gradient-to-r from-green-100 to-teal-50">
            <DialogTitle className="text-2xl font-heading text-green-800">
              {currentStep === 'welcome' ? 'Welcome to Greenify!' : 
               currentStep === 'profile' ? 'Tell us about yourself' : 
               'How would you like to use Greenify?'}
            </DialogTitle>
            <DialogDescription>
              {currentStep === 'welcome' ? 'Your one-stop platform for fresh, local produce and more.' : 
               currentStep === 'profile' ? 'Set up your profile for a personalized experience.' : 
               'Select the services you\'re interested in using.'}
            </DialogDescription>
          </DialogHeader>
          
          {currentStep === 'welcome' && (
            <WelcomeStep 
              onContinue={() => setCurrentStep('profile')} 
              onSkip={skipOnboarding} 
            />
          )}
          
          {currentStep === 'profile' && (
            <ProfileSetupStep 
              initialProfile={profile}
              onSubmit={handleProfileUpdate} 
              onBack={() => setCurrentStep('welcome')}
            />
          )}
          
          {currentStep === 'services' && (
            <ServiceSelectionStep 
              initialServices={selectedServices}
              onSubmit={handleServiceSelection} 
              onBack={() => setCurrentStep('profile')}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Debug button for resetting onboarding (only visible in development) */}
      {import.meta.env.DEV && isOnboarded && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={resetOnboarding}
          className="fixed bottom-4 right-4 z-50 bg-white"
        >
          Reset Onboarding
        </Button>
      )}
    </>
  );
};

export default UserFlowController;
