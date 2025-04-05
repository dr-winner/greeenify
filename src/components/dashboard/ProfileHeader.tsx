
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, LogOut } from "lucide-react";
import { UserProfile } from "@/types/user";
import { useNavigate } from "react-router-dom";

interface ProfileHeaderProps {
  userProfile: UserProfile;
  onEdit: () => void;
}

const ProfileHeader = ({ userProfile, onEdit }: ProfileHeaderProps) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    
    // Redirect to home
    navigate('/');
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={userProfile.avatar} alt={userProfile.displayName} />
            <AvatarFallback className="bg-green-100 text-green-800 text-xl">
              {getInitials(userProfile.displayName)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">{userProfile.displayName}</h2>
            <p className="text-gray-600 mb-1">{userProfile.email}</p>
            {userProfile.phoneNumber && (
              <p className="text-gray-600 mb-1">{userProfile.phoneNumber}</p>
            )}
            <div className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium mt-1">
              {userProfile.role === 'farmer' ? 'Farmer' : 'Buyer'}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Member since {new Date(userProfile.joinedDate).toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button onClick={onEdit} variant="outline" className="flex items-center gap-2">
              <Edit size={16} />
              Edit Profile
            </Button>
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 text-red-600">
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
