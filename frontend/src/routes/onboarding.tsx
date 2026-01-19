// src/routes/onboarding.tsx
import { createFileRoute } from "@tanstack/react-router"
import { useForm } from "@tanstack/react-form"

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
})

function OnboardingPage() {
  const form = useForm({
    defaultValues: {
      organizationName: "",
      schoolName: "",
      schoolAddress: "",
      academicYear: "",
    },
    onSubmit: async ({ value }) => {
      // TODO: remplacer par appel API réel
      console.log("ONBOARDING VALUES :", value)
      alert("Onboarding envoyé ! (API à brancher)")
    },
  })

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-purple-500 to-purple-700 items-center justify-center">
        <div className="text-center text-white space-y-6">
          <div className="text-4xl font-bold">Jetfy</div>
          <h1 className="text-4xl font-extrabold">
            Configurez votre
            <br />
            <span className="text-purple-200">espace scolaire</span>
          </h1>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="w-full max-w-md space-y-5 px-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Onboarding
            </h2>
            <p className="text-gray-500 text-sm">
              Complétez les informations pour activer votre compte
            </p>
          </div>

          {/* Organisation */}
          <form.Field name="organizationName">
            {(field) => (
              <div className="space-y-1">
                <label className="text-sm font-medium">Nom de l'organisation</label>
                <input
                  type="text"
                  placeholder="Groupe Scolaire La Réussite"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}
          </form.Field>

          {/* École */}
          <form.Field name="schoolName">
            {(field) => (
              <div className="space-y-1">
                <label className="text-sm font-medium">Nom de l'école</label>
                <input
                  type="text"
                  placeholder="La Réussite – Primaire"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="schoolAddress">
            {(field) => (
              <div className="space-y-1">
                <label className="text-sm font-medium">Adresse de l'école</label>
                <input
                  type="text"
                  placeholder="Abidjan"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}
          </form.Field>

          {/* Année scolaire */}
          <form.Field name="academicYear">
            {(field) => (
              <div className="space-y-1">
                <label className="text-sm font-medium">Année scolaire</label>
                <input
                  type="text"
                  placeholder="2025-2026"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}
          </form.Field>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
          >
            Valider et créer mon compte
          </button>
        </form>
      </div>
    </div>
  )
}
