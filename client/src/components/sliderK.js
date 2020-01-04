import React from "react";

export default function SliderK({ value = 0.5 }) {
  return (
    <div>
      <div style={{ fontSize: 10, textAlign: "center" }}>weight</div>
      <input
        style={{ width: 150 }}
        type="range"
        name="points"
        min="0"
        max="1"
        step="0.05"
        defaultValue={value}
      />
    </div>
  );
}
