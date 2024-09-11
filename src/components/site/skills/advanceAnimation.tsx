/**
 * Renders an animated circular progress bar with customizable colors and types.
 *
 * @param {Object} props - The component props.
 * @param {number} props.max - The maximum value of the progress bar.
 * @param {number} props.value - The current value of the progress bar.
 * @param {number} props.min - The minimum value of the progress bar.
 * @param {string} props.gaugePrimaryColor - The primary color of the progress bar.
 * @param {string} props.gaugeSecondaryColor - The secondary color of the progress bar.
 * @param {string} [props.className] - An optional CSS class name to apply to the component.
 * @param {string} [props.type] - The type of the progress bar, can be "advance", "beginner", or "intermediate".
 * @returns {JSX.Element} - The animated circular progress bar component.
 */
import { cn } from "@/lib/utils";

interface Props {
  max: number;
  value: number;
  min: number;
  gaugePrimaryColor: string;
  gaugeSecondaryColor: string;
  className?: string;
  
  type?: string;
}

export default function AnimatedCircularProgressBar({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor,
  gaugeSecondaryColor,
  className,
  type,
}: Props) {
  const circumference = 2 * Math.PI * 45;
  const percentPx = circumference / 100;
  const currentPercent = ((value - min) / (max - min)) * 100;

  return (
    <div
      className={cn(
        "relative flex justify-center items-center w-20 h-20 lg:w-28 lg:h-28",
        className
      )}
      style={
        {
          "--circle-size": "100px",
          "--circumference": circumference,
          "--percent-to-px": `${percentPx}px`,
          "--gap-percent": "5",
          "--offset-factor": "0",
          "--transition-length": "1s",
          "--transition-step": "200ms",
          "--delay": "0s",
          "--percent-to-deg": "3.6deg",
          transform: "translateZ(0)",
        } as React.CSSProperties
      }
    >
      <svg
        fill="none"
        className="w-full h-full"
        strokeWidth="4" // Thinner circle
        viewBox="0 0 100 100"
      >
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          strokeWidth="4"
          className="opacity-100"
          style={{
            stroke: gaugeSecondaryColor,
            strokeDasharray: `${circumference} ${circumference}`,
          }}
        />
        
        {/* Foreground Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          strokeWidth="4"
          className="opacity-100"
          style={{
            stroke: gaugePrimaryColor,
            strokeDasharray: `${currentPercent * percentPx} ${circumference}`,
            transition: "stroke-dasharray var(--transition-length) ease var(--delay)",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
      
      {type =="advance" &&
       <span
       className="absolute text-xs lg:text-[16px] font-base text-[#2f953f] transition-opacity duration-500 ease-linear"
     >
       Advanced
     </span>
      }
      {type =="beginner" &&
       <span
       className="absolute text-xs lg:text-[16px] font-base text-[rgb(255,161,46)] transition-opacity duration-500 ease-linear"
     >
      Beginner
     </span>
      }{type =="intermediate" &&
        <span
        className="absolute text-xs lg:text-[16px] font-base text-[rgba(252,252,58,0.73)] transition-opacity duration-500 ease-linear"
      >
        Intermediate
      </span>
       }
      </div>
     
  );
}
