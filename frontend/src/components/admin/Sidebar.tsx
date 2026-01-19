import { useState, useRef, useEffect } from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import {
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  DevicePhoneMobileIcon,
  PaperAirplaneIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // 🔹 Route active
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  const sections = [
    {
      title: "Tableau de bord",
      links: [{ label: "Dashboard", icon: HomeIcon, to: "/admin/dashboard" }],
    },
    {
      title: "Données",
      links: [
        { label: "Contacts", icon: UserGroupIcon, to: "/admin/contacts" },
        { label: "Templates", icon: DocumentTextIcon, to: "/admin/templates" },
      ],
    },
    {
      title: "SMS",
      links: [
        { label: "Noms d'expéditeurs", icon: DevicePhoneMobileIcon, to: "/admin/senders" },
        { label: "Envoi de message", icon: PaperAirplaneIcon, to: "/admin/send-message" },
      ],
    },
    {
      title: "Paramètre",
      links: [{ label: "Setting", icon: CogIcon, to: "/admin/support" }],
    },
  ]

  // 🔹 Ajuste la hauteur max pour animation slide
  const [menuHeight, setMenuHeight] = useState(0)
  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.scrollHeight)
    }
  }, [isOpen])

  return (
    <>
      {/* 🔹 Navbar mobile */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b shadow z-50 flex items-center justify-between px-4 py-3">
        <div className="text-[#2061D9] font-bold text-xl">SOUKLOU</div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-[#2061D9] text-white rounded-lg"
        >
          {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </header>

      {/* 🔹 Menu déroulant mobile avec animation */}
      <div
        className="lg:hidden fixed top-16 left-0 right-0 overflow-hidden transition-all duration-300 ease-in-out z-40"
        style={{ maxHeight: isOpen ? `${menuHeight}px` : "0px" }}
      >
        <div ref={menuRef} className="bg-white border-b shadow">
          {sections.map((section) => (
            <div key={section.title} className="py-2 border-t first:border-t-0">
              <p className="text-gray-400 uppercase text-xs font-semibold px-4 mb-1">
                {section.title}
              </p>
              {section.links.map((link) => {
                const isActive = pathname.startsWith(link.to)
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition
                      ${
                        isActive
                          ? "bg-[#2061D9]/10 text-[#2061D9] font-semibold"
                          : "text-gray-700 hover:bg-gray-100 hover:text-[#2061D9]"
                      }`}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                )
              })}
            </div>
          ))}

          {/* Déconnexion */}
          <div className="px-4 py-4 border-t">
            <button
              onClick={() => console.log("Déconnexion")}
              className="flex items-center gap-2 w-full px-4 py-2 rounded-lg hover:bg-red-50 transition text-red-600 font-medium"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Sidebar desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r shadow-lg h-screen sticky top-0">
        <div className="px-6 py-4 border-b">
          <div className="text-[#2061D9] font-bold text-xl">SOUKLOU</div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="text-gray-400 uppercase text-xs font-semibold px-2 mb-2">
                {section.title}
              </p>

              {section.links.map((link) => {
                const isActive = pathname.startsWith(link.to)
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition
                      ${
                        isActive
                          ? "bg-[#2061D9]/10 text-[#2061D9] font-semibold"
                          : "text-gray-700 hover:bg-gray-100 hover:text-[#2061D9]"
                      }`}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="px-4 py-4 border-t mt-auto">
          <button
            onClick={() => console.log("Déconnexion")}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-lg hover:bg-red-50 transition text-red-600 font-medium"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  )
}
