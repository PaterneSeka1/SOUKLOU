import { createFileRoute } from "@tanstack/react-router"
import { AdminLayout } from "../../layouts/AdminLayout"
import { useState } from "react"
import { useForm } from "@tanstack/react-form"

export const Route = createFileRoute("/admin/schools")({
  component: SchoolsPage,
})

interface School { id: number; name: string; address: string; academicYear: string }

export function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([
    { id: 1, name: "Lycée ABC", address: "Abidjan", academicYear: "2025-2026" },
    { id: 2, name: "Collège ABC", address: "Abidjan", academicYear: "2025-2026" },
  ])
  const [isModalOpen, setModalOpen] = useState(false)

  const form = useForm({ defaultValues: { name: "", address: "", academicYear: "" }, onSubmit: ({ value }) => {
    setSchools([...schools, { id: Date.now(), ...value }])
    setModalOpen(false)
    form.reset()
  }})

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Écoles</h1>
        <button onClick={() => setModalOpen(true)} className="bg-[#2061D9] text-white px-4 py-2 rounded-lg">Ajouter une école</button>
      </div>

      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
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
            {schools.map(school => (
              <tr key={school.id} className="border-b border-gray-100">
                <td className="p-2">{school.name}</td>
                <td className="p-2">{school.address}</td>
                <td className="p-2">{school.academicYear}</td>
                <td className="p-2 space-x-2">
                  <button className="text-[#2061D9] hover:underline">Modifier</button>
                  <button onClick={() => setSchools(schools.filter(s => s.id !== school.id))} className="text-red-600 hover:underline">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Ajouter une école</h2>
            <form onSubmit={e => { e.preventDefault(); form.handleSubmit() }} className="space-y-4">
              <form.Field name="name">{field => (
                <div>
                  <label className="block text-sm font-medium">Nom</label>
                  <input type="text" value={field.state.value} onChange={e => field.handleChange(e.target.value)}
                    className="w-full px-4 py-2 rounded border border-gray-200 focus:ring-2 focus:ring-[#2061D9]" />
                </div>
              )}</form.Field>

              <form.Field name="address">{field => (
                <div>
                  <label className="block text-sm font-medium">Adresse</label>
                  <input type="text" value={field.state.value} onChange={e => field.handleChange(e.target.value)}
                    className="w-full px-4 py-2 rounded border border-gray-200 focus:ring-2 focus:ring-[#2061D9]" />
                </div>
              )}</form.Field>

              <form.Field name="academicYear">{field => (
                <div>
                  <label className="block text-sm font-medium">Année scolaire</label>
                  <input type="text" value={field.state.value} onChange={e => field.handleChange(e.target.value)}
                    className="w-full px-4 py-2 rounded border border-gray-200 focus:ring-2 focus:ring-[#2061D9]" />
                </div>
              )}</form.Field>

              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100">Annuler</button>
                <button type="submit" className="px-4 py-2 rounded bg-[#2061D9] text-white hover:bg-[#174bb0]">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
