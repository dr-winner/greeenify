
const FeaturesSection = () => {
  return (
    <section className="py-16 bg-green-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-semibold mb-4">Why Choose Farm Fresh Market?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our farm-to-table marketplace connects you directly with local farmers, ensuring you get the freshest, most nutritious food while supporting sustainable agriculture.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<MoneyIcon />}
            title="Farm Fresh Quality"
            description="Get produce picked at peak ripeness, full of flavor and nutrition not found in most stores."
          />
          <FeatureCard
            icon={<ShieldIcon />}
            title="Support Local Farmers"
            description="Your purchase directly supports local farmers and sustainable agricultural practices."
          />
          <FeatureCard
            icon={<TruckIcon />}
            title="Fast Delivery"
            description="From farm to your doorstep within 24-48 hours, ensuring maximum freshness and taste."
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white rounded-xl p-6 text-center shadow-md">
    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-heading font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const MoneyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 18h10"></path>
    <path d="M2 14h7"></path>
    <path d="M2 10h7"></path>
    <path d="M2 6h16"></path>
    <path d="M18 10h-4a2 2 0 1 0 0 4h4a2 2 0 1 0 0-4z"></path>
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);

const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
    <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
    <path d="M5 17h-2v-4m0 -4h2"></path>
    <path d="M9 17l6 0"></path>
    <path d="M19 17h2v-4m0 -4h-2"></path>
    <path d="M5 9l14 0"></path>
  </svg>
);

export default FeaturesSection;
