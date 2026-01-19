import { useState, useRef, useEffect } from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import {
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  DevicePhoneMobileIcon,
  PaperAirplaneIcon,
  UserIcon, // icône profil
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  PlusIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Simulons l’utilisateur avec ses organisations
  const user = {
    organizations: [
      { id: "1", name: "Groupe Scolaire ABC" },
      { id: "2", name: "Groupe Scolaire XYZ" },
      { id: "3", name: "École Primaire 123" },
      { id: "4", name: "Lycée DEF" },
      { id: "5", name: "Collège LMN" },
      { id: "6", name: "École GHI" },
    ],
  }

  const pathname = useRouterState({ select: (state) => state.location.pathname })

  const sections = [
    { title: "Tableau de bord", links: [{ label: "Dashboard", icon: HomeIcon, to: "/admin/dashboard" }] },
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
    { title: "Compte", links: [{ label: "Profil", icon: UserIcon, to: "/admin/settings" }] },
  ]

  // Animation slide mobile
  const [menuHeight, setMenuHeight] = useState(0)
  useEffect(() => {
    if (menuRef.current) setMenuHeight(menuRef.current.scrollHeight)
  }, [isOpen])

  const handleSelectOrg = (orgId: string) => {
    console.log("Organisation sélectionnée :", orgId)
    setOrgDropdownOpen(false)
    setIsOpen(false)
  }

  const hasMultipleOrgs = user.organizations.length > 1

  // 🔹 Fermeture automatique si clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOrgDropdownOpen(false)
      }
    }
    if (orgDropdownOpen) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [orgDropdownOpen])

  const OrgButton = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`px-4 py-4 border-t relative`}>
      {hasMultipleOrgs ? (
        <>
          <button
            onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
            className="flex items-center justify-between w-full px-4 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 font-medium transition"
          >
            <span>Changer d'organisation</span>
            <ChevronDownIcon
              className={`w-5 h-5 transition-transform ${orgDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {orgDropdownOpen && (
            <>
              {/* Overlay */}
              <div className="fixed inset-0 bg-black bg-opacity-20 z-40" />

              {/* Panel dropdown au-dessus du bouton */}
              <div
                ref={dropdownRef}
                className="absolute left-0 bottom-full mb-2 w-64 max-h-80 overflow-y-auto bg-white border rounded shadow-lg z-50"
              >
                {user.organizations.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => handleSelectOrg(org.id)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    {org.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <Link
          to="/admin/organizations/add"
          className="flex items-center gap-2 w-full px-4 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 font-medium transition"
        >
          <PlusIcon className="w-5 h-5" />
          Ajouter une organisation
        </Link>
      )}
    </div>
  )

  return (
    <>
      {/* Navbar mobile */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b shadow z-50 flex items-center justify-between px-4 py-3">
        <div className="text-[#2061D9] font-bold text-xl">
          <img src="/logo2.png" alt="Logo" className="h-8" />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-[#2061D9] text-white rounded-lg"
        >
          {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </header>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-30 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu mobile */}
      <div
        className="lg:hidden fixed top-16 left-0 right-0 overflow-hidden transition-all duration-300 ease-in-out z-40"
        style={{ maxHeight: isOpen ? `${menuHeight}px` : "0px" }}
      >
        <div ref={menuRef} className="bg-white border-b shadow">
          {sections.map((section) => (
            <div key={section.title} className="py-2 border-t first:border-t-0">
              <p className="text-gray-400 uppercase text-xs font-semibold px-4 mb-1">{section.title}</p>
              {section.links.map((link) => {
                const isActive = pathname.startsWith(link.to)
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition
                      ${isActive ? "bg-[#2061D9]/10 text-[#2061D9] font-semibold" : "text-gray-700 hover:bg-gray-100 hover:text-[#2061D9]"}`}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                )
              })}
            </div>
          ))}

          {/* Organisation mobile */}
          <OrgButton mobile />

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

      {/* Sidebar desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r shadow-lg h-screen sticky top-0">
        <div className="px-6 py-4 border-b">
          <img src="/logo2.png" alt="Logo" className="h-10" />
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="text-gray-400 uppercase text-xs font-semibold px-2 mb-2">{section.title}</p>
              {section.links.map((link) => {
                const isActive = pathname.startsWith(link.to)
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition
                      ${isActive ? "bg-[#2061D9]/10 text-[#2061D9] font-semibold" : "text-gray-700 hover:bg-gray-100 hover:text-[#2061D9]"}`}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Organisation desktop */}
        <OrgButton />

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
      </aside>
    </>
  )
}
