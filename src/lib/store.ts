import { create } from "zustand"
import type {
  Role,
  AdminView,
  KurirView,
  Courier,
  AdminOrder,
  StockItem,
  KurirTask,
  HistoryItem,
  Customer,
} from "./types"

// ---- Brand colors used across the app ----
export const BRAND = {
  blue: "#0066CC",
  blueLight: "#E3F2FD",
  blueDeep: "#1E40AF",
  green: "#10B981",
  greenSoft: "#E6F7EE",
  orange: "#FFA500",
  red: "#EF4444",
  whatsapp: "#25D366",
}

// ---- Mock data (matches the designs) ----
const COURIERS: Courier[] = [
  {
    id: "C-001",
    name: "Andi Pratama",
    status: "Tersedia",
    location: "Jl. Kaliurang KM 7, Yogyakarta",
    rating: 4.9,
    totalTasks: 128,
    avatarColor: "#1E88E5",
    initials: "AP",
    phone: "+62 812-3456-7890",
  },
  {
    id: "C-002",
    name: "Budi Santoso",
    status: "Mengantar",
    location: "Bantul, Sleman",
    rating: 4.8,
    totalTasks: 100,
    avatarColor: "#43A047",
    initials: "BS",
    phone: "+62 813-9876-5432",
  },
  {
    id: "C-003",
    name: "Agung Prasetyo",
    status: "Tersedia",
    location: "Jl. Parangtritis KM 8",
    rating: 4.7,
    totalTasks: 84,
    avatarColor: "#FB8C00",
    initials: "AP",
    phone: "+62 856-1122-3344",
  },
  {
    id: "C-004",
    name: "Cahyo Suprapto",
    status: "Offline",
    location: "Banguntapan, Bantul",
    rating: 4.6,
    totalTasks: 76,
    avatarColor: "#8E24AA",
    initials: "CS",
    phone: "+62 878-5566-7788",
  },
  {
    id: "C-005",
    name: "Dodi Yanto",
    status: "Tersedia",
    location: "Jl. Wates KM 5",
    rating: 4.5,
    totalTasks: 62,
    avatarColor: "#E53935",
    initials: "DY",
    phone: "+62 821-1234-5678",
  },
]

const ADMIN_ORDERS: AdminOrder[] = [
  {
    id: "#ORD-2401",
    customer: "Ahmad Faisal",
    customerType: "Regular Client",
    location: "Panggungharjo, Sewon Rt3",
    items: "5 Galon Mineral",
    total: "Rp 50.000",
    status: "Ditolak",
  },
  {
    id: "#ORD-2405",
    customer: "Linda Wijaya",
    customerType: "New Customer",
    location: "Jl. Bantul Km 5, Bantul",
    items: "2 Galon Mineral",
    total: "Rp 15.000",
    status: "Dalam Pengiriman",
  },
  {
    id: "#ORD-2408",
    customer: "Budi Santoso",
    customerType: "Regular Client",
    location: "Bambanglipuro, kost indah Rt2",
    items: "10 Galon Mineral",
    total: "Rp 100.000",
    status: "Diproses",
  },
]

const STOCK_ITEMS: StockItem[] = [
  {
    id: "1",
    name: "Galon Mineral 19L (Isi)",
    productId: "GLN-MNR-19-F",
    quantity: 842,
    unit: "Unit",
    capacityPct: 82,
    type: "isi",
    thumbColor: "#007BFF",
  },
  {
    id: "2",
    name: "Galon Mineral 19L (Kosong)",
    productId: "GLN-MNR-19-E",
    quantity: 156,
    unit: "Pcs",
    capacityPct: 45,
    type: "kosong",
    thumbColor: "#9E9E9E",
  },
  {
    id: "3",
    name: "Galon Isi Ulang",
    productId: "GLN-PRM-12-F",
    quantity: 580,
    unit: "Pcs",
    capacityPct: 58,
    type: "isiUlang",
    thumbColor: "#1565C0",
  },
]

const KURIR_TASKS: KurirTask[] = [
  {
    id: "#AQ-29381-WC",
    recipient: "Ahmad Faisal",
    address: "Jl. Jogokarian, samping masjid, gang no 3",
    items: "5x Isi Ulang Galon 19L",
    status: "DITUGASKAN",
    buildingType: "rumah",
    orderItems: [{ qty: 5, name: "Isi Ulang Galon 19L" }],
  },
  {
    id: "#AQ-29382-WC",
    recipient: "Siti Rahma",
    address: "Sewon Rt3 Rw1 Bantul",
    items: "10x Isi Ulang Galon 19L, 2x Pompa",
    status: "DITUGASKAN",
    buildingType: "gedung",
    orderItems: [
      { qty: 10, name: "Isi Ulang Galon 19L" },
      { qty: 2, name: "Pompa" },
    ],
  },
  {
    id: "#AQ-29383-WC",
    recipient: "Budi Santoso",
    address: "Jl. Merpati No. 45, Banguntapan Bantul",
    items: "3x Isi Ulang Galon 19L",
    status: "DITUGASKAN",
    buildingType: "rumah",
    orderItems: [{ qty: 3, name: "Isi Ulang Galon 19L" }],
  },
  {
    id: "#AQ-29384-WC",
    recipient: "Dewi Lestari",
    address: "Jl. Godean KM 4, Sleman",
    items: "4x Isi Ulang Galon 19L",
    status: "DITUGASKAN",
    buildingType: "rumah",
    orderItems: [{ qty: 4, name: "Isi Ulang Galon 19L" }],
  },
]

const HISTORY: HistoryItem[] = [
  {
    id: "#AQ-29381",
    customer: "Budi Setiawan",
    time: "14:20 WIB",
    location: "Teras depan (Sesuai Instruksi)",
    instructions: "Titipkan di teras depan",
  },
  {
    id: "#AQ-29379",
    customer: "Siti Aminah",
    time: "12:45 WIB",
    location: "Depan pintu garasi",
    instructions: "Serahkan langsung ke pelanggan",
  },
  {
    id: "#AQ-29375",
    customer: "Andi Pratama",
    time: "10:15 WIB",
    location: "Pos satpam blok B",
    instructions: "Titip di pos satpam",
  },
  {
    id: "#AQ-29368",
    customer: "Eko Wijaya",
    time: "Kemarin, 16:30",
    location: "Teras belakang",
    instructions: "Lewat pintu samping",
  },
]

const CUSTOMERS: Customer[] = [
  {
    id: "CUST-001",
    name: "Budi Santoso",
    phone: "081234567890",
    email: "budi.santoso@gmail.com",
    address: "Jl. Sudirman No. 123, Jakarta Selatan",
    customerType: "Regular Client",
    totalOrders: 45,
  },
  {
    id: "CUST-002",
    name: "Siti Rahayu",
    phone: "085678901234",
    email: "siti.rahayu@gmail.com",
    address: "Jl. Thamrin No. 45, Jakarta Pusat",
    customerType: "Regular Client",
    totalOrders: 120,
  },
  {
    id: "CUST-003",
    name: "Ahmad Hidayat",
    phone: "087890123456",
    email: "ahmad.hidayat@gmail.com",
    address: "Jl. Gatot Subroto No. 67, Jakarta Barat",
    customerType: "Regular Client",
    totalOrders: 32,
  },
  {
    id: "CUST-004",
    name: "Dewi Lestari",
    phone: "082345678901",
    email: "dewi.lestari@gmail.com",
    address: "Jl. Rasuna Said No. 89, Jakarta Selatan",
    customerType: "New Customer",
    totalOrders: 5,
  },
  {
    id: "CUST-005",
    name: "Rudi Hermawan",
    phone: "083456789012",
    email: "rudi.hermawan@gmail.com",
    address: "Jl. Kuningan No. 101, Jakarta Selatan",
    customerType: "Regular Client",
    totalOrders: 28,
  },
]

// ---- Store ----
interface AppState {
  role: Role
  adminView: AdminView
  kurirView: KurirView
  activeTaskId: string | null
  showPin: boolean

  // data
  couriers: Courier[]
  orders: AdminOrder[]
  stock: StockItem[]
  tasks: KurirTask[]
  history: HistoryItem[]
  customers: Customer[]
  orderTab: "Semua" | "Aktif" | "Selesai"

  // admin user
  adminName: string
  kurirName: string
  kurirId: string

  // actions
  login: (role: Role) => void
  logout: () => void
  setAdminView: (v: AdminView) => void
  setKurirView: (v: KurirView) => void
  setOrderTab: (t: "Semua" | "Aktif" | "Selesai") => void
  togglePin: () => void
  openTask: (id: string) => void
  startTask: (id: string) => void
  completeTask: (id: string) => void
  updateStockQty: (id: string, delta: number) => void
  applyStockUpdate: (id: string) => void
  addCourier: (data: Omit<Courier, "id" | "initials">) => void
  updateCourier: (id: string, data: Partial<Courier>) => void
  deleteCourier: (id: string) => void
  addOrder: (data: Omit<AdminOrder, "id">) => void
  addCustomer: (data: Omit<Customer, "id">) => void
  updateCustomer: (id: string, data: Partial<Customer>) => void
  deleteCustomer: (id: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  role: "none",
  adminView: "beranda",
  kurirView: "tugas",
  activeTaskId: null,
  showPin: false,

  couriers: COURIERS,
  orders: ADMIN_ORDERS,
  stock: STOCK_ITEMS,
  tasks: KURIR_TASKS,
  history: HISTORY,
  customers: CUSTOMERS,
  orderTab: "Semua",

  adminName: "Felix Admin",
  kurirName: "Andi Pratama",
  kurirId: "C-001",

  login: (role) => set({ role, kurirView: "tugas", adminView: "beranda" }),
  logout: () => set({ role: "none", activeTaskId: null }),
  setAdminView: (v) => set({ adminView: v }),
  setKurirView: (v) => set({ kurirView: v }),
  setOrderTab: (t) => set({ orderTab: t }),
  togglePin: () => set((s) => ({ showPin: !s.showPin })),
  openTask: (id) => set({ activeTaskId: id, kurirView: "detail" }),
  startTask: (id) =>
    set((s) => ({
      tasks: s.tasks.map((t) =>
        t.id === id ? { ...t, status: "DALAM_PENGIRIMAN" } : t
      ),
      activeTaskId: id,
      kurirView: "detail",
    })),
  completeTask: (id) =>
    set((s) => {
      const task = s.tasks.find((t) => t.id === id)
      const newHistory: HistoryItem[] = task
        ? [
            {
              id: task.id.replace("-WC", ""),
              customer: task.recipient,
              time: "14:30 WIB",
              location: task.address,
              instructions: "Teras depan (Sesuai Instruksi)",
            },
            ...s.history,
          ]
        : s.history
      return {
        tasks: s.tasks.map((t) =>
          t.id === id ? { ...t, status: "SELESAI" } : t
        ),
        history: newHistory,
        kurirView: "konfirmasi",
      }
    }),
  updateStockQty: (id, delta) =>
    set((s) => ({
      stock: s.stock.map((it) =>
        it.id === id
          ? {
              ...it,
              quantity: Math.max(0, it.quantity + delta),
              capacityPct: Math.min(
                100,
                Math.round(
                  ((it.quantity + delta) /
                    (it.type === "isi" ? 1000 : it.type === "kosong" ? 350 : 1000)) *
                    100
                )
              ),
            }
          : it
      ),
    })),
  applyStockUpdate: (_id) => {
    /* no-op: visual feedback only */
  },
  addCourier: (data) =>
    set((s) => {
      const initials = data.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
      const id = `C-${String(s.couriers.length + 1).padStart(3, "0")}`
      const colors = ["#1E88E5", "#43A047", "#FB8C00", "#8E24AA", "#E53935", "#00897B"]
      const avatarColor = colors[s.couriers.length % colors.length]
      return {
        couriers: [...s.couriers, { ...data, id, initials, avatarColor }],
      }
    }),
  updateCourier: (id, data) =>
    set((s) => ({
      couriers: s.couriers.map((c) =>
        c.id === id
          ? {
              ...c,
              ...data,
              initials: data.name
                ? data.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : c.initials,
            }
          : c
      ),
    })),
  deleteCourier: (id) =>
    set((s) => ({
      couriers: s.couriers.filter((c) => c.id !== id),
    })),
  addOrder: (data) =>
    set((s) => {
      const num = s.orders.length + 2400 + 1
      const id = `#ORD-${num}`
      return { orders: [{ ...data, id }, ...s.orders] }
    }),
  addCustomer: (data) =>
    set((s) => {
      const num = s.customers.length + 1
      const id = `CUST-${String(num).padStart(3, "0")}`
      return { customers: [...s.customers, { ...data, id }] }
    }),
  updateCustomer: (id, data) =>
    set((s) => ({
      customers: s.customers.map((c) => (c.id === id ? { ...c, ...data } : c)),
    })),
  deleteCustomer: (id) =>
    set((s) => ({
      customers: s.customers.filter((c) => c.id !== id),
    })),
}))
