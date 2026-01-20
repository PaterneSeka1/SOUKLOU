import { ReactNode, useState } from "react"
import { Sidebar } from "../components/admin/Sidebar"
import { BellIcon, XMarkIcon } from "@heroicons/react/24/outline"

interface Props {
  children: ReactNode
}

export function AdminLayout({ children }: Props) {
  const [open, setOpen] = useState(false)

  // 🔔 Fake notifications (à brancher API plus tard)
  const notifications = [
    {
      id: 1,
      title: "Paiement reçu",
      message: "Le parent de Jean Dupont a payé 50 000 FCFA",
      date: "Il y a 2 min",
    },
    {
      id: 2,
      title: "Nouvelle inscription",
      message: "Un élève a été inscrit au Lycée ABC",
      date: "Il y a 1 heure",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="lg:ml-64 pt-[88px] lg:pt-0 p-6">
        {children}
      </main>

      {/* 🔔 FLOATING NOTIFICATION BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#2061D9] text-white flex items-center justify-center shadow-2xl hover:bg-[#174bb0] transition-all hover:scale-110"
      >
        <BellIcon className="w-6 h-6" />
      </button>

      {/* 🔔 MODAL NOTIFICATIONS */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/50">
          <div className="bg-white w-full lg:max-w-md rounded-t-3xl lg:rounded-2xl shadow-2xl p-6 animate-in slide-in-from-bottom lg:slide-in-from-top">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Notifications</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-sm text-gray-500 text-center">
                  Aucune notification
                </p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
                  >
                    <div className="font-semibold text-sm">{n.title}</div>
                    <div className="text-sm text-gray-600">{n.message}</div>
                    <div className="text-xs text-gray-400 mt-1">{n.date}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
