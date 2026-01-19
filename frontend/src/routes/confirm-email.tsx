// src/routes/confirm-email.tsx
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/confirm-email")({
  component: ConfirmEmailPage,
})

function ConfirmEmailPage() {
  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#2061D9] to-[#174bb0] items-center justify-center">
        <div className="text-center text-white space-y-6">
          <div className="text-4xl font-bold">Jetfy</div>
          <h1 className="text-4xl font-extrabold">
            Votre plateforme de
            <br />
            <span className="text-[#2061D9]/50">services cloud</span>
          </h1>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-8 space-y-6 text-center">
          <div className="text-[#2061D9] text-5xl">📧</div>

          <h2 className="text-2xl font-bold text-gray-900">
            Confirmez votre email
          </h2>

          <p className="text-gray-500 text-sm">
            Un email de confirmation vient d’être envoyé.
            <br />
            Veuillez vérifier votre boîte de réception et cliquer sur le lien
            pour activer votre compte.
          </p>

          <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
            Pensez à vérifier vos <strong>spams</strong> si vous ne voyez pas
            l’email.
          </div>

          <Link
            to="/login"
            className="block w-full py-3 rounded-lg bg-[#2061D9] text-white font-semibold hover:bg-[#174bb0] transition"
          >
            Aller à la connexion
          </Link>
        </div>
      </div>
    </div>
  )
}
