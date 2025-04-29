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
    <div style={{ "--deg": direction === "forward" ? "180deg" : "-180deg" }}>
      {children}
      <div className="button-group">
        <button name="previous" onClick={handlePrev}>
          ←
        </button>
        <button name="next" onClick={handleNext}>
          →
        </button>
      </div>
    </div>
  );
}
