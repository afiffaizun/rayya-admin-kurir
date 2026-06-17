"use client"

import { ArrowLeft } from "lucide-react"

export function KurirPageHeader({
  title,
  onBack,
  right,
}: {
  title: string
  onBack: () => void
  right?: React.ReactNode
}) {
  return (
    <header className="flex items-center justify-between px-5 py-3.5">
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          aria-label="Kembali"
          className="grid h-9 w-9 place-items-center rounded-full text-slate-700 hover:bg-slate-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="text-base font-bold text-slate-900">{title}</span>
      </div>
      {right}
    </header>
  )
}
