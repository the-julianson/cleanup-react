import * as React from "react";

export default function Carousel({ children, onNext, onPrevious }) {
  const [direction, setDirection] = React.useState("forward");

  const handlePrev = React.useCallback(() => {
    setDirection("backward");
    onPrevious();
  }, [onPrevious]);

  const handleNext = React.useCallback(() => {
    setDirection("forward");
    onNext();
  }, [onNext]);

  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handlePrev, handleNext]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-2xl">
        {children}
      </div>
      <div className="mt-6 flex justify-center space-x-4 w-full max-w-2xl">
        <button
          onClick={handlePrev}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          ← Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
