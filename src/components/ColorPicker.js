import React from "react";

const ColorPicker = ({ selectedColor, onColorChange }) => {
  const colors = [
    { name: "blue", class: "bg-blue-600" },
    { name: "red", class: "bg-red-600" },
    { name: "orange", class: "bg-orange-600" },
    { name: "black", class: "bg-black" },
    { name: "gray", class: "bg-gray-600" },
    { name: "pink", class: "bg-pink-600" },
    { name: "green", class: "bg-green-600" },
    { name: "purple", class: "bg-purple-600" },
  ];

  const renderedColors = colors.map((color) => (
    <label key={color.name} className="flex items-center gap-2">
      <input
        type="radio"
        name="color"
        value={color.name}
        checked={selectedColor === color.name}
        onChange={onColorChange}
        className="hidden"
      />
      <span
        className={`${color.class} rounded-full w-7 h-7 border-2 cursor-pointer ${
          selectedColor === color.name ? 'opacity-100' : 'opacity-20'
        }`}
      ></span>
    </label>
  ));

  return <div className="flex gap-2">{renderedColors}</div>;
};

export default ColorPicker;
