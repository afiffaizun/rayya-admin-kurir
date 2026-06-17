"use client"

import { useAppStore } from "@/lib/store"
import LoginScreen from "@/components/LoginScreen"
import AdminShell from "@/components/admin/AdminShell"
import KurirApp from "@/components/kurir/KurirApp"

export default function Home() {
  const role = useAppStore((s) => s.role)

  if (role === "admin") return <AdminShell />
  if (role === "kurir") return <KurirApp />
  return <LoginScreen />
}
