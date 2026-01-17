"use client"

interface FormFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  required?: boolean
  placeholder?: string
}

export default function FormField({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
}: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-dark-300 mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
      />
    </div>
  )
}
