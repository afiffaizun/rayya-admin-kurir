"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Droplets,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
} from "lucide-react"
import { useAppStore, BRAND } from "@/lib/store"
import { MobileFrame } from "@/components/kurir/MobileFrame"

type LoginMode = "select" | "admin" | "kurir"

export default function LoginScreen() {
  const [mode, setMode] = useState<LoginMode>("select")
  const login = useAppStore((s) => s.login)

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* subtle blue gradient corners — shared background */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, #E6F0FF 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, #E6F7FF 0%, transparent 70%)" }}
      />

      <AnimatePresence mode="wait">
        {mode === "select" && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-10"
          >
            <Logo size={72} />
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
              Aqua<span style={{ color: BRAND.blue }}>Water</span>
            </h1>
            <p className="mt-2 text-center text-sm text-slate-500">
              Pengantaran Cepat &amp; Higienis
            </p>

            <div className="mt-10 w-full max-w-sm space-y-4">
              <p className="text-center text-sm font-medium text-slate-600">
                Pilih peran untuk masuk
              </p>
              <RoleCard
                title="Admin"
                desc="Kelola pesanan, armada, dan stok galon"
                icon={<ShieldCheck className="h-6 w-6" />}
                onClick={() => setMode("admin")}
              />
              <RoleCard
                title="Kurir"
                desc="Terima dan antar tugas pengiriman"
                icon={<Truck className="h-6 w-6" />}
                onClick={() => setMode("kurir")}
              />
            </div>
          </motion.div>
        )}

        {mode === "admin" && (
          <motion.div
            key="admin"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10"
          >
            <BackToSelect onBack={() => setMode("select")} />
            <div className="w-full max-w-sm">
              <div className="flex flex-col items-center text-center">
                <Logo size={64} />
                <h1 className="mt-4 text-3xl font-bold text-slate-900">Admin</h1>
                <p className="mt-1 text-sm text-slate-500">
                  Pengantaran Cepat &amp; Higienis
                </p>
              </div>

              <LoginForm
                variant="admin"
                onBack={() => setMode("select")}
                onSubmit={() => login("admin")}
              />
            </div>
          </motion.div>
        )}

        {mode === "kurir" && (
          <motion.div
            key="kurir"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="relative z-10 min-h-screen flex items-center justify-center p-4"
          >
            <MobileFrame>
              <div
                className="flex flex-col h-full"
                style={{
                  background:
                    "linear-gradient(to top, #E6F7FF 0%, #F5FBFF 45%, #FFFFFF 100%)",
                }}
              >
                {/* top bar */}
                <div className="flex items-center gap-3 px-5 py-4">
                  <button
                    onClick={() => setMode("select")}
                    className="grid h-9 w-9 place-items-center rounded-full text-slate-900 hover:bg-black/5"
                    aria-label="Kembali"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <span className="text-base font-semibold text-slate-900">
                    Masuk Kurir
                  </span>
                </div>

                <div className="flex flex-col items-center px-6 pb-6 text-center">
                  <Logo size={72} />
                  <h1
                    className="mt-4 text-3xl font-bold"
                    style={{ color: BRAND.blue }}
                  >
                    Kurir Water
                  </h1>
                  <p className="mt-1 text-sm text-slate-700">
                    Pengantaran Cepat &amp; Higienis
                  </p>
                </div>

                <div className="px-5 pb-10">
                  <LoginForm
                    variant="kurir"
                    onBack={() => setMode("select")}
                    onSubmit={() => login("kurir")}
                  />
                </div>
              </div>
            </MobileFrame>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ---------- subcomponents ---------- */

function Logo({ size = 64 }: { size?: number }) {
  return (
    <div
      className="grid place-items-center rounded-2xl shadow-lg shadow-blue-500/20"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${BRAND.blue} 0%, #1E88E5 100%)`,
      }}
    >
      <Droplets className="text-white" style={{ width: size * 0.5, height: size * 0.5 }} />
    </div>
  )
}

function BackToSelect({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      className="absolute left-5 top-5 grid h-9 w-9 place-items-center rounded-full text-slate-700 hover:bg-black/5"
      aria-label="Kembali ke pilihan peran"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  )
}

function RoleCard({
  title,
  desc,
  icon,
  onClick,
}: {
  title: string
  desc: string
  icon: React.ReactNode
  onClick: () => void
}) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md"
    >
      <span
        className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white"
        style={{ background: `linear-gradient(135deg, ${BRAND.blue}, #1E88E5)` }}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-slate-900">{title}</span>
        <span className="block truncate text-xs text-slate-500">{desc}</span>
      </span>
      <ArrowRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
    </motion.button>
  )
}

function LoginForm({
  variant,
  onBack,
  onSubmit,
}: {
  variant: "admin" | "kurir"
  onBack: () => void
  onSubmit: () => void
}) {
  const [username, setUsername] = useState("")
  const [pin, setPin] = useState("")
  const [show, setShow] = useState(false)

  const isKurir = variant === "kurir"
  const cardClass = isKurir
    ? "rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.10)] border border-slate-100"
    : "mt-8 rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.10)] border border-slate-100"

  return (
    <div className={cardClass}>
      <Field
        label="Username"
        icon={<User className="h-5 w-5" />}
        placeholder={isKurir ? "Contoh: K-123456" : "username"}
        value={username}
        onChange={setUsername}
      />

      <div className="mt-5">
        <Field
          label="PIN / Kata Sandi"
          icon={<Lock className="h-5 w-5" />}
          placeholder="Masukkan 6 digit PIN"
          value={pin}
          onChange={setPin}
          type={show ? "text" : "password"}
          trailing={
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="text-slate-400 hover:text-slate-600"
              aria-label={show ? "Sembunyikan PIN" : "Tampilkan PIN"}
            >
              {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          }
        />
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            className="text-xs font-medium hover:underline"
            style={{ color: BRAND.blue }}
            onClick={() => {}}
          >
            Lupa PIN?
          </button>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onSubmit}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-md transition-shadow hover:shadow-lg"
        style={{ background: BRAND.blue }}
      >
        Masuk Sekarang
        <ArrowRight className="h-4 w-4" />
      </motion.button>

      <button
        onClick={onBack}
        className="mt-3 w-full text-center text-xs text-slate-400 hover:text-slate-600"
      >
        Ganti peran
      </button>
    </div>
  )
}

function Field({
  label,
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
  trailing,
}: {
  label: string
  icon: React.ReactNode
  placeholder: string
  value: string
  onChange: (v: string) => void
  type?: string
  trailing?: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-900">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
        <span className="text-slate-400">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-11 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />
        {trailing}
      </div>
    </label>
  )
}

export { BRAND }
