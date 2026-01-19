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
          className="w-full max-w-md space-y-5 px-8"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Mot de passe oublié
            </h2>
            <p className="text-gray-500 text-sm">
              Entrez votre adresse email pour recevoir un lien de réinitialisation
            </p>
          </div>

          {/* Email */}
          <form.Field name="email">
            {(field) => (
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Adresse email
                </label>
                <input
                  type="email"
                  placeholder="exemple@email.com"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2061D9]"
                />
              </div>
            )}
          </form.Field>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#2061D9] text-white font-semibold hover:bg-[#174bb0] transition"
          >
            Envoyer le lien
          </button>

          <p className="text-center text-sm text-gray-500">
            Retour à la{" "}
            <Link
              to="/login"
              className="text-[#2061D9] font-medium hover:underline"
            >
              connexion
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
