import  { useState } from "react";
import { AlertCircle, InfoIcon, Loader2 } from "lucide-react";
import { StatBox } from "./StatBox";
import PropTypes from "prop-types";



export function ClaimSection({
  title,
  stats,
  buttonText,
  onClaim,
  isLoading,
  error: initialError,
  claimStatus,
  claimError

}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(initialError || null);

  const handleClaim = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      await onClaim();      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process claim");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-so-gray-300">
      <h2 className="text-xl font-bold text-so-black mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {isLoading ? (
          <div className="col-span-3 flex justify-center items-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-so-blue-500" />
          </div>
        ) : (
          stats.map((stat, index) => (
            <StatBox
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))
        )}
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={handleClaim}
          disabled={isLoading || isProcessing}
          className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white 
            ${
              isLoading || isProcessing
                ? "bg-so-gray-400 cursor-not-allowed"
                : "bg-so-blue-500 hover:bg-so-blue-600"
            } 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-so-blue-500 transition-colors duration-150`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            buttonText
          )}
        </button>

        {(error || initialError || claimError) && (
          <div className="mt-4 flex items-center text-red-600">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {error || initialError || claimError}
            </span>
          </div>
        )}

        {claimStatus && (
          <div className="mt-4 flex items-center text-blue-600">
            <InfoIcon className="w-4 h-4 mr-2" />
            <span className="text-sm">{claimStatus}</span>
          </div>
        )}
      </div>
    </div>
  );
}

ClaimSection.propTypes = {
  title: PropTypes.string,
  stats: PropTypes.array,
  buttonText: PropTypes.string,
  onClaim: PropTypes.any,
  isLoading: PropTypes.bool,
  error: PropTypes.any,
  claimStatus: PropTypes.string,
  claimError: PropTypes.any
};
