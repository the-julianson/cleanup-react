import * as React from "react";

export default function PhotoCard({ loading, error, data, flipping }) {
  return (
    <div className="mx-auto w-full max-w-3xl card-container">
      <div className={`aspect-video bg-white rounded-lg shadow-lg overflow-hidden flex items-center justify-center ${flipping ? 'flip-enter' : 'flip-exit'}`}>
        {error ? (
          <div className="text-red-500 p-4 text-center w-full">{error}</div>
        ) : loading || !data ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading image...</p>
          </div>
        ) : (
          <img
            src={data.url}
            alt={data.description || "photo"}
            className="w-full h-full max-h-[60vh] object-cover rounded-lg"
          />
        )}
      </div>
    </div>
  );
}