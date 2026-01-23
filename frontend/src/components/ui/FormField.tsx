// src/components/ui/FormField.tsx
import React from "react"
import { Input } from "./Input"

interface FormFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
  error?: string
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
}) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        error={error}
      />
    </div>
  )
}
