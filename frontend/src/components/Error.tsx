import React from 'react';

interface ErrorProps {
  message?: string;
}

const Error: React.FC<ErrorProps> = ({ message = 'Something went wrong' }) => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700 text-lg">{message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Error;
