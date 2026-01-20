// src/routes/forgot-password.tsx
import { createFileRoute, Link } from "@tanstack/react-router"
import { useForm } from "@tanstack/react-form"

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
})

function ForgotPasswordPage() {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Forgot Password Email:", value.email)
      // Ici tu peux appeler ton API pour envoyer le mail de réinitialisation
    },
  })

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#2061D9] to-[#174bb0] items-center justify-center">
        <div className="text-center text-white space-y-6">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/20">
            <img src="/logo4.png" alt="Logo" className="h-10 w-auto" />
          </div>
          <div className="text-4xl font-bold">SOUKLOU</div>
          <h1 className="text-4xl font-extrabold">
            Réinitialisez votre
            <br />
            <span className="text-white">mot de passe</span>
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
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#2061D9] flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-gray-900">
              Mot de passe oublié ?
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Entrez votre adresse email pour recevoir un lien de réinitialisation
            </p>
          </div>

          {/* Email */}
          <form.Field name="email">
            {(field) => (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Adresse email</label>
                <input
                  type="email"
                  placeholder="exemple@email.com"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2061D9] focus:border-[#2061D9] transition"
                  required
                />
              </div>
            )}
          </form.Field>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#2061D9] text-white font-semibold hover:bg-[#174bb0] transition shadow-lg hover:shadow-xl"
          >
            Envoyer le lien
          </button>

          <p className="text-center text-sm text-gray-500">
            Retour à la{" "}
            <Link
              to="/login"
              className="text-[#2061D9] font-semibold hover:underline"
            >
              connexion
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}