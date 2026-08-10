"use client";
import type { SelectHTMLAttributes } from "react";

export const Select = ({
  options,
  onSelect,
  className = "",
  ...props
}: {
  options: { key: string; value: string }[];
  onSelect: (value: string) => void;
  className?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "onSelect">) => {
  return (
    <select
      {...props}
      onChange={(e) => onSelect(e.target.value)}
      className={`field-control appearance-none ${className}`}
    >
      {options.map((option) => (
        <option key={option.key} value={option.key}>
          {option.value}
        </option>
      ))}
    </select>
  );
};
