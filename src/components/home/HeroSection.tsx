
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const HeroSection = () => {
  const { toast } = useToast();
  
  const showWelcomeToast = () => {
    toast({
      title: "Welcome to Farm Fresh Market",
      description: "Your marketplace for fresh, local produce.",
    });
  };

  return (
    <section className="hero-pattern py-16 md:py-24">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-green-800 mb-4">
              Fresh From Farm to Your Table
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
              Support local farmers and enjoy freshly harvested produce delivered directly to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
                onClick={showWelcomeToast}
                asChild
              >
                <Link to="/shop">Shop Now</Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-green-100 rounded-full -translate-x-8 translate-y-8"></div>
            <img 
              src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Farming scene"
              className="relative rounded-3xl shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
