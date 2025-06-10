import React from 'react';

const RangeSlider = ({ label, value, min, max, step, onChange, formatValue }) => {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">
        {label}: {formatValue(value)}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />
    </div>
  );
};

export default RangeSlider;