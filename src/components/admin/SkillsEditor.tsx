"use client"

import ArrayEditor from "./ArrayEditor"
import type { Skills } from "@/types/portfolio"

interface SkillsEditorProps {
  skills: Skills
  onChange: (skills: Skills) => void
}

const skillCategories: { key: keyof Skills; label: string; placeholder: string }[] = [
  { key: "languages", label: "Programming Languages", placeholder: "Add language..." },
  { key: "frontend", label: "Frontend", placeholder: "Add frontend skill..." },
  { key: "backend", label: "Backend", placeholder: "Add backend skill..." },
  { key: "databases", label: "Databases", placeholder: "Add database..." },
  { key: "devops", label: "DevOps", placeholder: "Add devops skill..." },
  { key: "tools", label: "Tools", placeholder: "Add tool..." },
]

export default function SkillsEditor({ skills, onChange }: SkillsEditorProps) {
  const handleCategoryChange = (key: keyof Skills, items: string[]) => {
    onChange({ ...skills, [key]: items })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {skillCategories.map((category) => (
        <div key={category.key} className="glass-card p-6">
          <ArrayEditor
            label={category.label}
            items={skills[category.key]}
            onChange={(items) => handleCategoryChange(category.key, items)}
            placeholder={category.placeholder}
          />
        </div>
      ))}
    </div>
  )
}
