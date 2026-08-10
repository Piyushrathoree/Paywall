"use client";

import type { InputHTMLAttributes } from "react";

export const Textinput = ({
  placeholder,
  onChange,
  label,
  id,
  className = "",
  ...props
}: {
  placeholder?: string;
  onChange: (value: string) => void;
  label: string;
  id?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="field-label">
        {label}
      </label>
      <input
        {...props}
        id={inputId}
        className={`field-control ${className}`}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};
