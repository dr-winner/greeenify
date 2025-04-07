
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { MapPin } from "lucide-react";
import { useAuthContext } from "@/hooks/useAuthContext";

const StorageHeader = () => {
  const { requireAuth } = useAuthContext();

  const handleStorageClick = () => {
    return requireAuth();
  };

  return (
    <div className="text-center max-w-3xl mx-auto mb-8">
      <h1 className="text-4xl font-heading font-bold mb-4">Greenify Storage Solutions</h1>
      <p className="text-lg text-gray-600 mb-6">
        Store your bulk produce purchases in our state-of-the-art climate-controlled facilities 
        to maintain freshness and reduce waste.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          onClick={handleStorageClick}
        >
          <Link to="/storage-listings">
            <MapPin className="h-4 w-4" />
            View Storage Locations
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default StorageHeader;
