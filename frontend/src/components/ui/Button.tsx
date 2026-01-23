// src/components/ui/Button.tsx
import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`w-full py-3 rounded-lg bg-souklou-primary-800 text-white font-semibold
      hover:bg-souklou-primary-900 transition disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  )
}
