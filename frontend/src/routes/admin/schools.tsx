import { createFileRoute } from "@tanstack/react-router"
import { Sidebar } from "../../components/admin/Sidebar"
import { useState } from "react"
import { useForm } from "@tanstack/react-form"

export const Route = createFileRoute("/admin/schools")({
  component: SchoolsPage,
})

interface School {
  id: number
  name: string
  address: string
  academicYear: string
}

export function SchoolsPage() {
  // Mock data pour les écoles
  const [schools, setSchools] = useState<School[]>([
    { id: 1, name: "Lycée ABC", address: "Abidjan", academicYear: "2025-2026" },
    { id: 2, name: "Collège ABC", address: "Abidjan", academicYear: "2025-2026" },
  ])

  // État du modal
  const [isModalOpen, setModalOpen] = useState(false)

  // Formulaire TanStack Form
  const form = useForm({
    defaultValues: {
      name: "",
      address: "",
      academicYear: "",
    },
    onSubmit: ({ value }) => {
      // Ici tu peux remplacer par appel API réel
      const newSchool = { id: Date.now(), ...value }
      setSchools([...schools, newSchool])
      setModalOpen(false)
      form.reset()
    },
  })

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Écoles</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            Ajouter une école
          </button>
        </div>

        {/* Tableau des écoles */}
        <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-2">Nom</th>
                <th className="p-2">Adresse</th>
                <th className="p-2">Année scolaire</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school) => (
                <tr key={school.id} className="border-b border-gray-100">
                  <td className="p-2">{school.name}</td>
                  <td className="p-2">{school.address}</td>
                  <td className="p-2">{school.academicYear}</td>
                  <td className="p-2 space-x-2">
                    <button className="text-purple-600 hover:underline">Modifier</button>
                    <button
                      onClick={() => setSchools(schools.filter((s) => s.id !== school.id))}
                      className="text-red-600 hover:underline"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Ajouter école */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Ajouter une école</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  form.handleSubmit()
                }}
                className="space-y-4"
              >
                <form.Field name="name">
                  {(field) => (
                    <div>
                      <label className="block text-sm font-medium">Nom de l'école</label>
                      <input
                        type="text"
                        placeholder="Lycée ABC"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="address">
                  {(field) => (
                    <div>
                      <label className="block text-sm font-medium">Adresse</label>
                      <input
                        type="text"
                        placeholder="Abidjan"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="academicYear">
                  {(field) => (
                    <div>
                      <label className="block text-sm font-medium">Année scolaire</label>
                      <input
                        type="text"
                        placeholder="2025-2026"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  )}
                </form.Field>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
                  >
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
