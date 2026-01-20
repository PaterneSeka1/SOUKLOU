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
          <div className="w-20 h-20 mx-auto rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/20">
            <img src="/logo4.png" alt="Logo" className="h-10 w-auto" />
          </div>
          <div className="text-4xl font-bold">SOUKLOU</div>
          <h1 className="text-4xl font-extrabold">
            Votre plateforme de
            <br />
            <span className="text-white">paiements scolaires</span>
          </h1>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-8 py-12 space-y-6 text-center">
          {/* Logo top for mobile */}
          <div className="lg:hidden mb-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#2061D9] flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Confirmez votre email
          </h2>

          <p className="text-gray-500 text-sm">
            Un email de confirmation vient d'être envoyé.
            <br />
            Veuillez vérifier votre boîte de réception.
          </p>

          <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
            Pensez à vérifier votre boîte de réception et à cliquer sur le lien
            pour activer votre compte. Vérifiez aussi vos <strong>spams</strong> si vous ne voyez pas
            l'email.
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