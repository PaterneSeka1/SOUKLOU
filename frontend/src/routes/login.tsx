// src/routes/login.tsx
import { createFileRoute, Link } from "@tanstack/react-router"
import { useForm } from "@tanstack/react-form"

export const Route = createFileRoute("/login")({
  component: LoginPage,
})

function LoginPage() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value)
    },
  })

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#2061D9] to-[#2061D9] items-center justify-center">
        <div className="text-center text-white space-y-6">
          <img src="/logo1.png" alt="Logo" className="mx-auto h-20 w-auto" />
          {/* <div className="text-4xl font-bold">SOUKLOU</div> */}
          <h1 className="text-4xl font-extrabold">
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
            form.handleSubmit()
          }}
          className="w-full max-w-md space-y-6 px-8 py-12"
        >
          {/* Logo top for mobile */}
          <div className="lg:hidden text-center mb-6">
            <img src="/logo1.png" alt="Logo" className="mx-auto h-16 w-auto" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Connexion</h2>
            <p className="text-gray-500 text-sm">
              Connectez-vous pour accéder à votre espace
            </p>
          </div>

          {/* Email */}
          <form.Field name="email">
            {(field) => (
              <div className="space-y-1">
                <label className="text-sm font-medium">Adresse email</label>
                <input
                  type="email"
                  placeholder="exemple@email.com"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2061D9] focus:border-[#2061D9] transition"
                />
              </div>
            )}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => (
              <div className="space-y-1">
                <label className="text-sm font-medium">Mot de passe</label>
                <input
                  type="password"
                  placeholder="Votre mot de passe"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2061D9] focus:border-[#2061D9] transition"
                />
              </div>
            )}
          </form.Field>

          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-[#2061D9] hover:underline">
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#2061D9] text-white font-semibold hover:bg-[#174bb0] transition"
          >
            Se connecter
          </button>

          <p className="text-center text-sm text-gray-500">
            Pas encore de compte ?{" "}
            <Link
              to="/register"
              className="text-[#2061D9] font-medium hover:underline"
            >
              S'inscrire
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
