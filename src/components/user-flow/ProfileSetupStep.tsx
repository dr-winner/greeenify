
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UserProfile } from './UserFlowController';
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProfileSetupStepProps {
  initialProfile: UserProfile;
  onSubmit: (profile: UserProfile) => void;
  onBack: () => void;
}

const FOOD_PREFERENCES = [
  { id: "organic", label: "Organic" },
  { id: "local", label: "Locally Grown" },
  { id: "seasonal", label: "Seasonal" },
  { id: "vegetables", label: "Vegetables" },
  { id: "fruits", label: "Fruits" },
  { id: "dairy", label: "Dairy Products" },
  { id: "meat", label: "Meats" },
  { id: "gluten-free", label: "Gluten-Free" },
  { id: "vegan", label: "Vegan" }
];

const ProfileSetupStep = ({ initialProfile, onSubmit, onBack }: ProfileSetupStepProps) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  
  const handlePreferenceChange = (preference: string) => {
    setProfile(current => {
      const preferences = current.preferences.includes(preference)
        ? current.preferences.filter(p => p !== preference)
        : [...current.preferences, preference];
      
      return { ...current, preferences };
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(profile);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="displayName">Full Name</Label>
          <Input
            id="displayName"
            value={profile.displayName}
            onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
            placeholder="Enter your name"
            required
          />
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="address">Delivery Address</Label>
          <Input
            id="address"
            value={profile.address}
            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
            placeholder="Enter your address"
            required
          />
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            type="tel"
            value={profile.phoneNumber}
            onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
            placeholder="Enter your phone number"
            required
          />
        </div>
        
        <div className="space-y-3">
          <Label>Food Preferences</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Select the types of products you're interested in
          </p>
          <div className="grid grid-cols-2 gap-2">
            {FOOD_PREFERENCES.map((preference) => (
              <div key={preference.id} className="flex items-center space-x-2">
                <Checkbox
                  id={preference.id}
                  checked={profile.preferences.includes(preference.id)}
                  onCheckedChange={() => handlePreferenceChange(preference.id)}
                />
                <label
                  htmlFor={preference.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {preference.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between pt-3">
          <Button type="button" variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileSetupStep;
