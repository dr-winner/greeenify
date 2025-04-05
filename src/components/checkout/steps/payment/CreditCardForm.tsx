
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardDetails } from "../../types";

interface CreditCardFormProps {
  cardDetails?: Partial<CardDetails>;
  onCardDetailsChange: (details: Partial<CardDetails>) => void;
}

const CreditCardForm = ({ cardDetails, onCardDetailsChange }: CreditCardFormProps) => {
  return (
    <div className="space-y-4 border-t pt-4">
      <div className="space-y-2">
        <Label htmlFor="cardName">Cardholder Name</Label>
        <Input 
          id="cardName" 
          placeholder="Name on card" 
          value={cardDetails?.cardholderName || ''}
          onChange={(e) => onCardDetailsChange({ 
            ...cardDetails || {}, 
            cardholderName: e.target.value 
          })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input 
          id="cardNumber" 
          placeholder="1234 5678 9012 3456" 
          value={cardDetails?.cardNumber || ''}
          onChange={(e) => onCardDetailsChange({ 
            ...cardDetails || {}, 
            cardNumber: e.target.value 
          })}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input 
            id="expiryDate" 
            placeholder="MM/YY" 
            value={cardDetails?.expiryDate || ''}
            onChange={(e) => onCardDetailsChange({ 
              ...cardDetails || {}, 
              expiryDate: e.target.value 
            })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input 
            id="cvc" 
            placeholder="123" 
            value={cardDetails?.cvc || ''}
            onChange={(e) => onCardDetailsChange({ 
              ...cardDetails || {}, 
              cvc: e.target.value 
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;
