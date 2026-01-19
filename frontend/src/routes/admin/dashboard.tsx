// src/routes/admin/dashboard.tsx
import { createFileRoute, Link } from "@tanstack/react-router"
import { Sidebar } from "../../components/admin/Sidebar"

/* Route principale du dashboard */
export const Route = createFileRoute("/admin/dashboard")({
  component: DashboardPage,
})

/* Composant principal du dashboard */
function DashboardPage() {
  const organization = {
    name: "Groupe Scolaire ABC",
    schools: [
      { name: "Lycée ABC", activeYear: "2025-2026" },
      { name: "Collège ABC", activeYear: "2025-2026" },
    ],
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6">Bienvenue, Dirigeant</h1>

        {/* Organisation summary */}
        <OrganizationSummary organization={organization} />

        {/* Quick Actions */}
        <QuickActions />
      </main>
    </div>
  )
}

/* 🔁 Section Organisation */
function OrganizationSummary({ organization }: { organization: { name: string; schools: { name: string; activeYear: string }[] } }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Votre Organisation</h2>
      <p className="text-gray-700 font-medium">{organization.name}</p>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {organization.schools.map((school, idx) => (
          <div key={idx} className="bg-white rounded-lg p-4 shadow">
            <h3 className="font-semibold">{school.name}</h3>
            <p className="text-gray-500">Année scolaire active : {school.activeYear}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* 🔁 Section Actions rapides */
function QuickActions() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <LinkButton to="/admin/schools/add" label="Ajouter une école" />
        <LinkButton to="/admin/grades/add" label="Ajouter des niveaux" />
        <LinkButton to="/admin/students/import" label="Importer des élèves" />
        <LinkButton to="/admin/payments/plans" label="Créer un plan de paiement" />
        <LinkButton to="/admin/team/invite" label="Inviter des membres" />
      </div>
    </section>
  )
}

/* 🔁 Composant réutilisable pour les liens/actions rapides */
function LinkButton({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="block bg-[#2061D9] text-white rounded-lg p-6 text-center font-semibold hover:bg-[#174bb0] transition"
    >
      {label}
    </Link>
  )
}
