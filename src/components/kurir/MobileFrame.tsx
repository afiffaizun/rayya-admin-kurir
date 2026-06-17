"use client"

import React, { useEffect, useState } from "react"
import { Battery, Wifi, Signal } from "lucide-react"

interface MobileFrameProps {
  children: React.ReactNode
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      let hours = now.getHours()
      let minutes = now.getMinutes()
      const strHours = hours < 10 ? `0${hours}` : `${hours}`
      const strMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
      setTime(`${strHours}:${strMinutes}`)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-[430px] h-[880px] bg-slate-50 rounded-[48px] shadow-2xl border-[11px] border-slate-900 overflow-hidden flex flex-col select-none">
      {/* Top Speaker / Notch & Camera */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[28px] bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center">
        <div className="w-3 h-3 bg-slate-800 rounded-full mr-4 border border-slate-700"></div>
        <div className="w-14 h-1 bg-slate-700 rounded-full"></div>
      </div>

      {/* Screen Status Bar */}
      <div className="pt-3 px-6 pb-2 bg-slate-50 text-[12px] font-semibold text-slate-800 flex justify-between items-center z-40 select-none">
        <span>{time || "09:41"}</span>
        <div className="flex items-center gap-1.5">
          <Signal className="w-3.5 h-3.5 text-slate-800" />
          <Wifi className="w-3.5 h-3.5 text-slate-800" />
          <div className="flex items-center gap-0.5">
            <span className="text-[10px]">88%</span>
            <Battery className="w-4 h-4 text-slate-800" />
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 bg-white overflow-y-auto relative flex flex-col">
        {children}
      </div>

      {/* Bottom Home Indicator Bar */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-[5px] bg-slate-900 rounded-full z-50"></div>
    </div>
  )
}
