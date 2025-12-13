// src/components/ProntfyCoreLogo.jsx
import React from "react";

const ProntfyCoreLogo = ({
  width = "100%",       // agora responsivo
  maxWidth = 360,       // limite máximo (evita gigantismo)
  height = "auto",      // proporção correta
  showText = true,
  circleColor = "#2DD4BF",
  diamondColor = "#07203A"
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      maxWidth: maxWidth,
      height: "auto"
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="auto"
      viewBox="0 0 360 64"
      preserveAspectRatio="xMidYMid meet"   // impede distorções
      role="img"
      aria-label="Prontfy Core logo"
      style={{
        display: "block",
        width: "100%",
        height: "auto"
      }}
    >
      {/* Símbolo */}
      <g transform="translate(32,32)">
        <circle cx="0" cy="0" r="20" fill="none" stroke={circleColor} strokeWidth="4" />
        <g transform="rotate(45)">
          <polygon points="0,-28 4,0 0,28 -4,0" fill={diamondColor} />
        </g>
      </g>

      {/* Texto */}
      {showText && (
        <g transform="translate(64,44)">
          <text
            x="0"
            y="0"
            fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial"
            fontWeight="600"
            fontSize="20"
            fill={diamondColor}
          >
            Prontfy
          </text>
          <text
            x="95"
            y="0"
            fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial"
            fontWeight="600"
            fontSize="20"
            fill={diamondColor}
          >
            Core
          </text>
        </g>
      )}
    </svg>
  </div>
);

export default ProntfyCoreLogo;
