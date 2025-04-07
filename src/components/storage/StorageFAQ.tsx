
const StorageFAQ = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">What types of produce can I store?</h3>
          <p className="text-gray-600">You can store most types of fruits, vegetables, grains, and preserved foods. Our facilities are designed to accommodate various temperature and humidity requirements.</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">How do I access my stored items?</h3>
          <p className="text-gray-600">You can schedule a retrieval through your account or visit our facility during operating hours. We require 24-hour notice for large retrievals.</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Is there a limit to how much I can store?</h3>
          <p className="text-gray-600">Each plan comes with a specified storage capacity. If you need additional space, you can purchase multiple plans or upgrade to a larger option.</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">How secure is my produce?</h3>
          <p className="text-gray-600">Our facilities are secured with 24/7 monitoring, access control, and temperature alerts. Your items are inventoried and tracked throughout their storage period.</p>
        </div>
      </div>
    </div>
  );
};

export default StorageFAQ;
