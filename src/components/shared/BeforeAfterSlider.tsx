import { useState, useRef, useCallback } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  treatmentType?: string;
  duration?: string;
  result?: string;
}

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  treatmentType,
  duration,
  result,
}: BeforeAfterSliderProps) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) handleMove(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className="relative group">
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-col-resize select-none"
        style={{ boxShadow: "var(--shadow-card)" }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        {/* After image (full) */}
        <img src={afterImage} alt="After treatment" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        {/* Before image (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <img src={beforeImage} alt="Before treatment" className="absolute inset-0 w-full h-full object-cover" style={{ width: `${containerRef.current?.offsetWidth || 100}px`, maxWidth: "none" }} loading="lazy" />
        </div>
        {/* Divider line */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-primary-foreground/90 z-10" style={{ left: `${position}%` }}>
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-primary-foreground">
              <path d="M6 10L2 10M2 10L5 7M2 10L5 13M14 10L18 10M18 10L15 7M18 10L15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        {/* Labels */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-heading font-semibold bg-foreground/70 text-primary-foreground backdrop-blur-sm">{beforeLabel}</span>
        <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-heading font-semibold bg-primary/90 text-primary-foreground backdrop-blur-sm">{afterLabel}</span>
      </div>
      {/* Case info overlay */}
      {treatmentType && (
        <div className="mt-3 p-3 rounded-lg bg-secondary text-sm space-y-1">
          <p className="font-heading font-semibold text-foreground">{treatmentType}</p>
          {duration && <p className="text-muted-foreground">Duration: {duration}</p>}
          {result && <p className="text-muted-foreground">Result: {result}</p>}
        </div>
      )}
    </div>
  );
};

export default BeforeAfterSlider;
