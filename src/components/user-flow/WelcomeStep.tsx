
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

interface WelcomeStepProps {
  onContinue: () => void;
  onSkip: () => void;
}

const WelcomeStep = ({ onContinue, onSkip }: WelcomeStepProps) => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-center mb-2">Personalized Experience</h3>
          <p className="text-gray-500 text-center">
            Setting up your profile helps us tailor Greenify to your needs.
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-medium mb-2 flex items-center">
            <Star className="h-5 w-5 text-amber-500 mr-2" />
            What you'll get:
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Personalized product recommendations
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Priority access to seasonal harvests
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Custom delivery and storage solutions
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Notifications for products from your favorite farms
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col space-y-3">
          <Button onClick={onContinue} className="w-full bg-green-600 hover:bg-green-700">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="ghost" onClick={onSkip} className="text-gray-500">
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeStep;
