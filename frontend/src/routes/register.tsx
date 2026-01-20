// src/routes/register.tsx
import { createFileRoute, Link } from "@tanstack/react-router"
import { useForm } from "@tanstack/react-form"

export const Route = createFileRoute("/register")({
  component: RegisterPage,
})

function RegisterPage() {
  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      console.log("REGISTER VALUES:", value)
      // await fetch("/api/auth/register", {...})
    },
  })

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#2061D9] to-[#174bb0] items-center justify-center">
        <div className="text-center text-white space-y-6">
          <img src="/logo1.png" alt="Logo" className="mx-auto h-20 w-auto" />
          <h1 className="text-4xl font-extrabold leading-tight">
            Votre plateforme de
            <br />
            <span className="text-white">gestion d'école</span>
          </h1>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            void form.handleSubmit()
          }}
          className="w-full max-w-md space-y-6 px-8 py-12"
        >
          {/* Logo mobile */}
          <div className="lg:hidden text-center mb-6">
            <img src="/logo1.png" alt="Logo" className="mx-auto h-16 w-auto" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Inscription</h2>
            <p className="text-gray-500 text-sm mt-1">
              Créez votre compte pour commencer
            </p>
          </div>

          {/* Nom */}
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                !value ? "Nom requis" : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2061D9]"
                />
                {field.state.meta.errors?.[0] && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Téléphone */}
          <form.Field
            name="phone"
            validators={{
              onChange: ({ value }) =>
                !value ? "Téléphone requis" : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Téléphone</label>
                <input
                  type="tel"
                  placeholder="+225 01 23 45 67 89"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2061D9]"
                />
                {field.state.meta.errors?.[0] && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Email */}
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Email requis"
                  : !value.includes("@")
                  ? "Email invalide"
                  : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Adresse email</label>
                <input
                  type="email"
                  placeholder="exemple@email.com"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2061D9]"
                />
                {field.state.meta.errors?.[0] && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Mot de passe */}
          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Mot de passe requis"
                  : value.length < 6
                  ? "Minimum 6 caractères"
                  : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Mot de passe</label>
                <input
                  type="password"
                  placeholder="Votre mot de passe"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2061D9]"
                />
                {field.state.meta.errors?.[0] && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <button
            type="submit"
            disabled={form.state.isSubmitting}
            className="w-full py-3 rounded-lg bg-[#2061D9] text-white font-semibold hover:bg-[#174bb0] transition disabled:opacity-50"
          >
            {form.state.isSubmitting ? "Création..." : "S'inscrire"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Déjà un compte ?{" "}
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
