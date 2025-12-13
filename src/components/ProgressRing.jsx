import { useEffect, useState } from "react";
import "./ProgressRing.css";

export default function ProgressRing({ value = 0, label }) {
  const [progress, setProgress] = useState(0);

  const radius = 64;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.floor(value / 40));

    const interval = setInterval(() => {
      current += step;
      if (current >= value) {
        current = value;
        clearInterval(interval);
      }
      setProgress(current);
    }, 20);

    return () => clearInterval(interval);
  }, [value]);

  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <div className="progress-ring-card">
      <div className="ring-wrapper">
        <svg height={radius * 2} width={radius * 2}>
          {/* círculo de fundo */}
          <circle
            className="ring-bg"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          {/* círculo de progresso */}
          <circle
            className="ring-progress"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>

        <div className="ring-center">
          <span className="ring-value">{progress}%</span>
        </div>
      </div>

      <div className="ring-label">
        {label}
        <div className="ring-sub">
          Você já começou. Isso conta.
        </div>
      </div>
    </div>
  );
}
