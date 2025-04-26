
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="bg-harvest-500 py-16">
      <div className="container-custom">
        <div className="text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Ready to taste the difference?</h2>
          <p className="text-white text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers enjoying farm-fresh produce delivered to your doorstep.
          </p>
          <Button className="bg-white text-harvest-600 hover:bg-gray-100 px-8 py-6 text-lg font-medium" asChild>
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
