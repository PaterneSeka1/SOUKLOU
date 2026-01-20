import { Sidebar } from "../components/admin/Sidebar"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <main className="lg:ml-64 pt-[104px] lg:pt-8 px-6 pb-8 min-h-screen">
        {children}
      </main>
    </div>
  )
}
