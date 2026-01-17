"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ArrayEditorProps {
  label: string
  items: string[]
  onChange: (items: string[]) => void
  placeholder?: string
}

export default function ArrayEditor({
  label,
  items,
  onChange,
  placeholder = "Add item...",
}: ArrayEditorProps) {
  const [newItem, setNewItem] = useState("")

  const addItem = () => {
    if (newItem.trim()) {
      onChange([...items, newItem.trim()])
      setNewItem("")
    }
  }

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addItem()
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-dark-300 mb-2">{label}</label>

      <div className="flex flex-wrap gap-2 mb-3 min-h-[32px]">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.span
              key={`${item}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-1 px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-sm"
            >
              {item}
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="hover:text-red-400 transition-colors ml-1"
              >
                <X size={14} />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 px-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors text-sm"
        />
        <button
          type="button"
          onClick={addItem}
          className="p-2 bg-primary-500/10 text-primary-400 rounded-lg hover:bg-primary-500/20 transition-colors"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  )
}
