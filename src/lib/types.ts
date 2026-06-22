// Domain types for the AquaWater delivery management app

export type Role = "none" | "admin" | "kurir"

export type AdminView = "beranda" | "pesanan" | "kurir" | "stok" | "pelanggan"
export type KurirView = "tugas" | "perjalanan" | "riwayat" | "detail" | "konfirmasi"

export type OrderStatus = "Diproses" | "Dalam Pengiriman" | "Selesai" | "Ditolak"
export type CourierStatus = "Tersedia" | "Offline" | "Mengantar"
export type TaskStatus = "DITUGASKAN" | "DALAM_PENGIRIMAN" | "SELESAI"

export interface Courier {
  id: string
  name: string
  status: CourierStatus
  location: string
  rating: number
  totalTasks: number
  avatarColor: string
  initials: string
  phone: string
}

export interface AdminOrder {
  id: string
  customer: string
  customerType: string
  location: string
  items: string
  total: string
  status: OrderStatus
}

export interface StockItem {
  id: string
  name: string
  productId: string
  quantity: number
  unit: string
  capacityPct: number
  type: "isi" | "kosong" | "isiUlang"
  thumbColor: string
}

export interface KurirTask {
  id: string
  recipient: string
  address: string
  items: string
  status: TaskStatus
  buildingType?: "rumah" | "gedung"
  orderItems: { qty: number; name: string }[]
}

export interface Customer {
  id: string
  name: string
  phone: string
  email: string
  address: string
  customerType: "Regular Client" | "New Customer"
  totalOrders: number
}

export interface HistoryItem {
  id: string
  customer: string
  time: string
  location: string
  instructions: string
}
