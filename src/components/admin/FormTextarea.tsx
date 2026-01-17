"use client"

interface FormTextareaProps {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  placeholder?: string
  rows?: number
}

export default function FormTextarea({
  label,
  value,
  onChange,
  required = false,
  placeholder,
  rows = 4,
}: FormTextareaProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-dark-300 mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
      />
    </div>
  )
}
