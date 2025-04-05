
const BankTransferInfo = () => {
  return (
    <div className="space-y-4 border-t pt-4">
      <div className="p-4 bg-green-50 rounded-md">
        <h3 className="font-medium mb-2">Bank Transfer Instructions</h3>
        <p className="text-sm text-gray-600 mb-3">Please transfer the total amount to the following bank account:</p>
        <div className="text-sm">
          <p><strong>Bank Name:</strong> Ghana Commercial Bank</p>
          <p><strong>Account Name:</strong> Greenify Ltd</p>
          <p><strong>Account Number:</strong> 1234567890</p>
          <p><strong>Branch:</strong> Accra Main</p>
          <p><strong>Reference:</strong> Your phone number</p>
        </div>
      </div>
    </div>
  );
};

export default BankTransferInfo;
