// src/routes/onboarding.tsx
import { useState } from "react"
import { createFileRoute, Link } from "@tanstack/react-router"
import { useForm } from "@tanstack/react-form"

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
})

export function OnboardingPage() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)

  const form = useForm({
    defaultValues: {
      organizationName: "",
      schoolName: "",
      schoolAddress: "",
      academicYear: "",
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData()

      formData.append("organizationName", value.organizationName)
      formData.append("schoolName", value.schoolName)
      formData.append("schoolAddress", value.schoolAddress)
      formData.append("academicYear", value.academicYear)

      if (logoFile) {
        formData.append("logo", logoFile)
      }

      console.log("ONBOARDING FORM DATA", formData)
      alert("Onboarding envoyé (API à brancher)")
    },
  })

  const handleLogoChange = (file?: File) => {
    if (!file) return
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT SIDE (desktop) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#2061D9] to-[#174bb0] items-center justify-center">
        <div className="text-center text-white space-y-6 px-8">
          <img src="/logo1.png" alt="Logo" className="mx-auto h-20" />

          <h1 className="text-4xl font-extrabold">
            Configurez votre
            <br />
            <span className="text-white">espace scolaire</span>
          </h1>

          <p className="text-white/80 max-w-md mx-auto">
            Centralisez la gestion de vos écoles, élèves et équipes en quelques minutes.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="w-full max-w-md space-y-6 px-6 py-12"
        >
          {/* Logo mobile */}
          <div className="lg:hidden text-center">
            <img src="/logo1.png" alt="Logo" className="mx-auto h-14 mb-4" />
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Onboarding
            </h2>
            <p className="text-sm text-gray-500">
              Complétez les informations pour activer votre compte
            </p>
          </div>

          {/* ORGANISATION */}
          <form.Field name="organizationName">
            {(field) => (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Nom de l’organisation
                </label>
                <input
                  type="text"
                  placeholder="Groupe Scolaire La Réussite"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-[#2061D9]"
                />
              </div>
            )}
          </form.Field>

          {/* ÉCOLE */}
          <form.Field name="schoolName">
            {(field) => (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Nom de l’école
                </label>
                <input
                  type="text"
                  placeholder="La Réussite – Primaire"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-[#2061D9]"
                />
              </div>
            )}
          </form.Field>

          {/* ADRESSE */}
          <form.Field name="schoolAddress">
            {(field) => (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Adresse de l’école
                </label>
                <input
                  type="text"
                  placeholder="Abidjan"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-[#2061D9]"
                />
              </div>
            )}
          </form.Field>

          {/* ANNÉE */}
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
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-[#2061D9]"
                />
              </div>
            )}
          </form.Field>

          {/* LOGO OPTIONNEL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Logo de l’organisation <span className="text-gray-400">(optionnel)</span>
            </label>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-lg border bg-gray-100 flex items-center justify-center overflow-hidden">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Preview logo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-gray-400 text-center">
                    Aucun logo
                  </span>
                )}
              </div>

              <label className="cursor-pointer px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium transition">
                Choisir une image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleLogoChange(e.target.files?.[0])}
                />
              </label>
            </div>

            <p className="text-xs text-gray-400">
              PNG, JPG ou SVG – max 2 Mo
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#2061D9] text-white font-semibold
              hover:bg-[#174bb0] transition"
          >
            Valider et continuer
          </button>

          <p className="text-center text-sm text-gray-500">
            Vous avez déjà un compte ?{" "}
            <Link to="/login" className="text-[#2061D9] font-medium hover:underline">
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
