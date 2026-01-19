// src/routes/onboarding.tsx
import { createFileRoute } from "@tanstack/react-router"
import { useForm } from "@tanstack/react-form"
import { Link } from "@tanstack/react-router"

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
})

export function OnboardingPage() {
  const form = useForm({
    defaultValues: {
      organizationName: "",
      schoolName: "",
      schoolAddress: "",
      academicYear: "",
    },
    onSubmit: async ({ value }) => {
      console.log("ONBOARDING VALUES :", value)
      alert("Onboarding envoyé ! (API à brancher)")
    },
  })

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT SIDE - gradient + logo + texte (desktop only) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#2061D9] to-[#2061D9] items-center justify-center">
        <div className="text-center text-white space-y-6 px-8">
          <img src="/logo1.png" alt="Logo" className="mx-auto h-20 w-auto" />
          <div className="text-4xl font-extrabold">
            Configurez votre <br />
            <span className="text-white">espace scolaire</span>
          </div>
          <p className="text-white/80">
            Créez facilement et rapidement votre environnement pour gérer vos élèves et vos enseignants.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="w-full max-w-md space-y-6 px-6 py-12"
        >
          {/* Logo top for mobile */}
          <div className="lg:hidden text-center mb-6">
            <img src="/logo1.png" alt="Logo" className="mx-auto h-16 w-auto" />
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Onboarding</h2>
            <p className="text-gray-500 text-sm">
              Complétez les informations pour activer votre compte
            </p>
          </div>

          {/* Organisation */}
          <form.Field name="organizationName">
            {(field) => (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Nom de l'organisation
                </label>
                <input
                  type="text"
                  placeholder="Groupe Scolaire La Réussite"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2061D9] focus:border-[#2061D9] transition"
                />
              </div>
            )}
          </form.Field>

          {/* École */}
          <form.Field name="schoolName">
            {(field) => (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Nom de l'école
                </label>
                <input
                  type="text"
                  placeholder="La Réussite – Primaire"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2061D9] focus:border-[#2061D9] transition"
                />
              </div>
            )}
          </form.Field>

          {/* Adresse */}
          <form.Field name="schoolAddress">
            {(field) => (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Adresse de l'école
                </label>
                <input
                  type="text"
                  placeholder="Abidjan"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2061D9] focus:border-[#2061D9] transition"
                />
              </div>
            )}
          </form.Field>

          {/* Année scolaire */}
          <form.Field name="academicYear">
            {(field) => (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Année scolaire
                </label>
                <input
                  type="text"
                  placeholder="2025-2026"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2061D9] focus:border-[#2061D9] transition"
                />
              </div>
            )}
          </form.Field>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#2061D9] text-white font-semibold hover:bg-[#174bb0] transition"
          >
            Valider et créer mon compte
          </button>

          <p className="text-center text-sm text-gray-500">
            Vous avez déjà un compte ?{" "}
            <Link
              to="/login"
              className="text-[#2061D9] font-medium hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
