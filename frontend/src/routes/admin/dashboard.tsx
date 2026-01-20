import { createFileRoute } from "@tanstack/react-router"
import { AdminLayout } from "../../layouts/AdminLayout"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts"
import { Link } from "@tanstack/react-router"

export const Route = createFileRoute("/admin/dashboard")({
  component: DashboardPage,
})

function DashboardPage() {
  // 🔹 Statistiques clés
  const stats = [
    { title: "Écoles", value: 4 },
    { title: "Élèves", value: 1240 },
    { title: "Paiements", value: 3450000 },
    { title: "Parents", value: 980 },
  ]

  // 🔹 Graphique paiements par mois
  const paymentsData = [
    { month: "Jan", amount: 200000 },
    { month: "Fév", amount: 300000 },
    { month: "Mar", amount: 250000 },
    { month: "Avr", amount: 400000 },
    { month: "Mai", amount: 350000 },
    { month: "Juin", amount: 450000 },
  ]

  // 🔹 Graphique répartition élèves
  const studentsData = [
    { name: "Primaire", value: 500 },
    { name: "Collège", value: 420 },
    { name: "Lycée", value: 320 },
  ]
  const COLORS = ["#2061D9", "#4F46E5", "#9333EA"]

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>

      {/* 🔹 Statistiques clés */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl p-6 shadow">
            <div className="text-sm text-gray-500">{stat.title}</div>
            <div className="text-2xl font-bold mt-2">{stat.value.toLocaleString()}</div>
          </div>
        ))}
      </div>

      {/* 🔹 Graphiques */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {/* Paiements par mois */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Paiements par mois</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={paymentsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => `${value.toLocaleString()} FCFA`} />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#2061D9" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition élèves */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Répartition des élèves</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={studentsData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {studentsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔹 Actions rapides */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <QuickActionButton to="/admin/schools/add" label="Ajouter une école" />
          <QuickActionButton to="/admin/grades/add" label="Ajouter des niveaux" />
          <QuickActionButton to="/admin/students/import" label="Importer des élèves" />
          <QuickActionButton to="/admin/payments/plans" label="Créer un plan de paiement" />
          <QuickActionButton to="/admin/team/invite" label="Inviter des membres" />
        </div>
      </div>
    </AdminLayout>
  )
}

function QuickActionButton({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="block bg-[#2061D9] text-white rounded-xl p-6 text-center font-semibold hover:bg-[#174bb0] transition"
    >
      {label}
    </Link>
  )
}
