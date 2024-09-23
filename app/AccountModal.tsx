import React from "react";

interface AccountModalProps {
  onResponse: (hasAccount: boolean) => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ onResponse }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Account Check</h2>
        <p className="mb-6 text-gray-600">
          Do you have an account on <span className="font-semibold">XYZ</span>?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => onResponse(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            No
          </button>
          <button
            onClick={() => onResponse(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
