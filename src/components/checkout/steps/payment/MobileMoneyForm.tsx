
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MobileMoneyDetails } from "../../types";

interface MobileMoneyFormProps {
  mobileMoneyDetails?: Partial<MobileMoneyDetails>;
  onMobileMoneyDetailsChange: (details: Partial<MobileMoneyDetails>) => void;
}

const MobileMoneyForm = ({ mobileMoneyDetails, onMobileMoneyDetailsChange }: MobileMoneyFormProps) => {
  return (
    <div className="space-y-4 border-t pt-4">
      <div className="space-y-2">
        <Label htmlFor="mobileNumber">Mobile Money Number</Label>
        <Input 
          id="mobileNumber" 
          placeholder="0201234567" 
          value={mobileMoneyDetails?.phoneNumber || ''}
          onChange={(e) => onMobileMoneyDetailsChange({ 
            ...mobileMoneyDetails || {}, 
            phoneNumber: e.target.value 
          })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="provider">Provider</Label>
        <select 
          id="provider" 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={mobileMoneyDetails?.provider || 'mtn'}
          onChange={(e) => onMobileMoneyDetailsChange({ 
            ...mobileMoneyDetails || {}, 
            provider: e.target.value 
          })}
        >
          <option value="mtn">MTN Mobile Money</option>
          <option value="vodafone">Vodafone Cash</option>
          <option value="airtel">AirtelTigo Money</option>
        </select>
      </div>
    </div>
  );
};

export default MobileMoneyForm;
