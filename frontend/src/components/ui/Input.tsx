// src/components/ui/Input.tsx
import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const Input: React.FC<InputProps> = ({ error, className, ...props }) => {
  return (
    <div className="space-y-1">
      <input
        {...props}
        className={`w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300
        focus:outline-none focus:ring-2 focus:ring-souklou-primary-500 ${className}`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
