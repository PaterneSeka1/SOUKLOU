import { createFileRoute } from "@tanstack/react-router"
import { AdminLayout } from "../../layouts/AdminLayout"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell
} from "recharts"

export const Route = createFileRoute("/admin/dashboard")({
  component: DashboardPage,
})

function DashboardPage() {
  const school = {
    name: "Lycée Moderne XYZ",
    classes: [
      { name: "6ème", level: "Secondaire", students: 120 },
      { name: "5ème", level: "Secondaire", students: 110 },
      { name: "4ème", level: "Secondaire", students: 100 },
      { name: "3ème", level: "Secondaire", students: 90 },
      { name: "Seconde", level: "Lycée", students: 80 },
      { name: "Première", level: "Lycée", students: 70 },
      { name: "Terminale", level: "Lycée", students: 60 },
    ],
    payments: [
      { month: "Jan", amount: 150000 },
      { month: "Fév", amount: 200000 },
      { month: "Mar", amount: 180000 },
      { month: "Avr", amount: 220000 },
      { month: "Mai", amount: 190000 },
      { month: "Juin", amount: 240000 },
    ],
    parents: 630,
  }

  const COLORS = ["#2061D9", "#4F46E5", "#9333EA", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6"]

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">{school.name} - Tableau de bord</h1>

      {/* 🔹 Statistiques clés */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="text-sm text-gray-500">Classes</div>
          <div className="text-2xl font-bold mt-2">{school.classes.length}</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="text-sm text-gray-500">Élèves</div>
          <div className="text-2xl font-bold mt-2">{school.classes.reduce((a, c) => a + c.students, 0)}</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="text-sm text-gray-500">Paiements</div>
          <div className="text-2xl font-bold mt-2">{school.payments.reduce((a, p) => a + p.amount, 0).toLocaleString()} FCFA</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="text-sm text-gray-500">Parents</div>
          <div className="text-2xl font-bold mt-2">{school.parents}</div>
        </div>
      </div>

      {/* 🔹 Graphique paiements par mois */}
      <div className="bg-white rounded-xl p-6 shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Paiements par mois</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={school.payments}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => `${value.toLocaleString()} FCFA`} />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#2061D9" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🔹 Répartition élèves par classe */}
      <div className="bg-white rounded-xl p-6 shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Répartition des élèves par classe</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={school.classes} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="students">
              {school.classes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AdminLayout>
  )
}
