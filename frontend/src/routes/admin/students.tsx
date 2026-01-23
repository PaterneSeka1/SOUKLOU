import { useEffect, useRef, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import DataTable from "datatables.net-react"
import DT from "datatables.net-dt"
import { AdminLayout } from "@/layouts/AdminLayout"
import { XMarkIcon } from "@heroicons/react/24/outline"

import "datatables.net-dt/css/dataTables.dataTables.min.css"

DataTable.use(DT)

interface Student {
  id: number
  name: string
  classe: string
  matricule: string
  statut: "Actif" | "Inactif"
}

export const Route = createFileRoute("/admin/students")({
  component: StudentsRoute,
})

function StudentsRoute() {
  const [students, setStudents] = useState<Student[]>([])
  const [modalAdd, setModalAdd] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [selected, setSelected] = useState<Student | null>(null)

  const tableWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setStudents([
      { id: 1, name: "Jean Dupont", classe: "Terminale A", matricule: "MAT-001", statut: "Actif" },
      { id: 2, name: "Aïcha Koné", classe: "Première D", matricule: "MAT-002", statut: "Actif" },
      { id: 3, name: "Yao Kouassi", classe: "Seconde C", matricule: "MAT-003", statut: "Inactif" },
    ])
  }, [])

  /* ================= EVENT DELEGATION ================= */

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const btn = target.closest("button[data-action]") as HTMLButtonElement
      if (!btn) return

      const id = Number(btn.dataset.id)
      const action = btn.dataset.action
      const student = students.find((s) => s.id === id)
      if (!student) return

      if (action === "edit") {
        setSelected({ ...student })
        setModalEdit(true)
      }

      if (action === "delete") {
        setSelected(student)
        setModalDelete(true)
      }
    }

    const el = tableWrapperRef.current
    el?.addEventListener("click", handler)
    return () => el?.removeEventListener("click", handler)
  }, [students])

  /* ================= CRUD ================= */

  const addStudent = (student: Student) => {
    setStudents((prev) => [...prev, { ...student, id: Date.now() }])
    setModalAdd(false)
  }

  const saveEdit = () => {
    setStudents((prev) =>
      prev.map((s) => (s.id === selected!.id ? selected! : s))
    )
    setModalEdit(false)
  }

  const deleteStudent = () => {
    setStudents((prev) => prev.filter((s) => s.id !== selected!.id))
    setModalDelete(false)
  }

  const badge = (s: Student["statut"]) =>
    s === "Actif"
      ? `<span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Actif</span>`
      : `<span class="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">Inactif</span>`

  return (
    <AdminLayout>
      <div className="bg-white rounded-2xl shadow p-6" ref={tableWrapperRef}>
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Élèves</h1>
          <button
            onClick={() => setModalAdd(true)}
            className="px-4 py-2 bg-souklou-primary-600 text-white rounded-lg"
          >
            + Ajouter élève
          </button>
        </div>

        {/* TABLE */}
        <DataTable
          className="display"
          data={students.map((s) => [
            s.name,
            s.classe,
            s.matricule,
            badge(s.statut),
            `
              <div class="flex gap-2">
                <button data-action="edit" data-id="${s.id}">✏️</button>
                <button data-action="delete" data-id="${s.id}">🗑</button>
              </div>
            `,
          ])}
          options={{
            columnDefs: [{ targets: -1, orderable: false }],
            language: {
              search: "Rechercher :",
              emptyTable: "Aucun élève",
            },
          }}
        >
          <thead>
            <tr>
              <th>Nom</th>
              <th>Classe</th>
              <th>Matricule</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
        </DataTable>
      </div>

      {/* MODAL AJOUT */}
      {modalAdd && (
        <StudentModal
          title="Ajouter un élève"
          onClose={() => setModalAdd(false)}
          onSubmit={addStudent}
        />
      )}

      {/* MODAL ÉDITION */}
      {modalEdit && selected && (
        <StudentModal
          title="Modifier l’élève"
          student={selected}
          onClose={() => setModalEdit(false)}
          onSubmit={(s) => {
            setSelected(s)
            saveEdit()
          }}
        />
      )}

      {/* MODAL SUPPRESSION */}
      {modalDelete && selected && (
        <ConfirmModal
          message={`Supprimer ${selected.name} ?`}
          onCancel={() => setModalDelete(false)}
          onConfirm={deleteStudent}
        />
      )}
    </AdminLayout>
  )
}

/* ================= MODALS ================= */

function StudentModal({ title, student, onSubmit, onClose }: any) {
  const [form, setForm] = useState<Student>(
    student ?? { id: 0, name: "", classe: "", matricule: "", statut: "Actif" }
  )

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold">{title}</h2>
          <button onClick={onClose}>
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <input
          className="w-full p-3 border rounded-lg mb-3"
          placeholder="Nom"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full p-3 border rounded-lg mb-3"
          placeholder="Classe"
          value={form.classe}
          onChange={(e) => setForm({ ...form, classe: e.target.value })}
        />

        <input
          className="w-full p-3 border rounded-lg mb-3"
          placeholder="Matricule"
          value={form.matricule}
          onChange={(e) => setForm({ ...form, matricule: e.target.value })}
        />

        <select
          className="w-full p-3 border rounded-lg mb-4"
          value={form.statut}
          onChange={(e) =>
            setForm({ ...form, statut: e.target.value as Student["statut"] })
          }
        >
          <option>Actif</option>
          <option>Inactif</option>
        </select>

        <button
          onClick={() => onSubmit(form)}
          className="w-full bg-souklou-primary-600 text-white py-3 rounded-lg"
        >
          Enregistrer
        </button>
      </div>
    </div>
  )
}

function ConfirmModal({ message, onConfirm, onCancel }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel}>Annuler</button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}
