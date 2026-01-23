import { useState, useRef, useEffect } from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import {
  HomeIcon,
  BuildingLibraryIcon,
  AcademicCapIcon,
  ArrowUpTrayIcon,
  CreditCardIcon,
  UserPlusIcon,  
  UserIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  PlusIcon,
  ChevronDownIcon,
  UserGroupIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  const user = {
    organizations: [
      { id: "1", name: "Groupe Scolaire ABC" },
      { id: "2", name: "Lycée Moderne XYZ" },
      { id: "3", name: "Collège Privé DEF" },
    ],
  }

  const hasMultipleOrgs = user.organizations.length > 1

  // Sections avec title optionnel (null pour dashboard)
  const sections = [
    { title: null, links: [{ label: "Tableau de bord", icon: HomeIcon, to: "/admin/dashboard" }] },
    {
      title: "Paiements",
      links: [
        { label: "Transactions", icon: CreditCardIcon, to: "/admin/payments/transactions" },
        { label: "Plans de paiement", icon: AcademicCapIcon, to: "/admin/payments/plans" },
      ],
    },
    {
      title: "Gestion des paiements scolaire",
      links: [
        { label: "Élèves", icon: ArrowUpTrayIcon, to: "/admin/students" },
        { label: "Parents d'élèves", icon: UserGroupIcon, to: "/admin/parents" },
      ],
    },
    { title: "Communication", links: [{ label: "Annonces", icon: MegaphoneIcon, to: "/admin/announcements" }] },
    { title: "Administration", links: [{ label: "Membres de l'équipe", icon: UserPlusIcon, to: "/admin/teams" }] },
    { title: "Compte", links: [{ label: "Profil", icon: UserIcon, to: "/admin/profil" }] },
  ]

  const [menuHeight, setMenuHeight] = useState(0)
  useEffect(() => {
    if (menuRef.current) {
      const vh = window.innerHeight
      const navbarH = 88
      setMenuHeight(vh - navbarH)
    }
  }, [isOpen])

  // Fermer dropdown org en cliquant à l'extérieur
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOrgDropdownOpen(false)
      }
    }
    if (orgDropdownOpen) document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [orgDropdownOpen])

  const handleSelectOrg = (id: string) => {
    console.log("Organisation sélectionnée :", id)
    setOrgDropdownOpen(false)
    setIsOpen(false)
  }

  const OrgButton = () => (
    <div className="relative" ref={dropdownRef}>
      {hasMultipleOrgs ? (
        <>
          <button
            onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
            className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-souklou-primary-800 text-white hover:bg-souklou-primary-700 font-semibold transition-all duration-300 border border-souklou-primary-700 shadow"
          >
            <div className="flex items-center gap-2">
              <BuildingLibraryIcon className="w-4 h-4 text-white" />
              <span className="text-xs">Organisations</span>
            </div>
            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${orgDropdownOpen ? "rotate-180" : ""}`} />
          </button>
          {orgDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-souklou-primary-200 overflow-hidden z-50">
              {user.organizations.map((org, i) => (
                <button
                  key={org.id}
                  onClick={() => handleSelectOrg(org.id)}
                  className={`w-full text-left px-3 py-2 hover:bg-souklou-primary-50 transition text-sm font-medium text-gray-800 ${
                    i !== user.organizations.length - 1 ? "border-b border-souklou-primary-100" : ""
                  } hover:text-souklou-primary-700`}
                >
                  {org.name}
                </button>
              ))}
              <button
                onClick={() => {
                  console.log("Ajouter une nouvelle organisation")
                  setOrgDropdownOpen(false)
                }}
                className="w-full text-left px-3 py-2 bg-souklou-primary-50 hover:bg-souklou-primary-100 transition text-sm font-semibold text-souklou-primary-700 border-t border-souklou-primary-200"
              >
                <div className="flex items-center gap-2">
                  <PlusIcon className="w-4 h-4" />
                  Ajouter une organisation
                </div>
              </button>
            </div>
          )}
        </>
      ) : (
        <button className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl bg-souklou-primary-800 text-white hover:bg-souklou-primary-700 font-semibold transition-all duration-300 border border-souklou-primary-700 shadow">
          <PlusIcon className="w-4 h-4 text-white" />
          <span className="text-xs">Ajouter organisation</span>
        </button>
      )}
    </div>
  )

  return (
    <>
      {/* MOBILE NAVBAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-souklou-primary-900 shadow px-4 py-3 flex items-center justify-between border-b border-souklou-primary-800">
        <div className="flex items-center gap-2">
          <img src="/logo1.png" alt="Logo" className="h-8 w-auto" />
          <div>
            <div className="text-lg font-bold text-white tracking-tight">SOUKLOU</div>
            <div className="text-xs text-white/70 font-medium">Gestion des Paiements Scolaire</div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl bg-souklou-primary-800 text-white hover:bg-souklou-primary-700 transition-all duration-200 border border-souklou-primary-700 hover:scale-110"
        >
          {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* MOBILE MENU */}
      <div
        ref={menuRef}
        style={{ maxHeight: isOpen ? `${menuHeight}px` : "0px" }}
        className="lg:hidden fixed top-[88px] left-0 right-0 bottom-0 z-40 bg-souklou-primary-900 overflow-y-auto transition-all duration-300 ease-out shadow-lg"
      >
        <div className="p-4 space-y-4">
          <OrgButton />
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {section.title && (
                <div className="px-2 mb-1">
                  <div className="text-xs font-bold text-white/60 uppercase tracking-widest">{section.title}</div>
                </div>
              )}
              {section.links.map((link) => {
                const isActive = pathname.startsWith(link.to)
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-souklou-primary-700 text-white shadow-sm"
                        : "text-white/90 hover:bg-souklou-primary-800"
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="text-sm font-semibold">{link.label}</span>
                  </Link>
                )
              })}
            </div>
          ))}
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-700/20 transition-all duration-200 w-full font-semibold">
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex lg:flex-col fixed left-0 top-0 h-screen w-64 bg-souklou-primary-900 shadow-lg z-30">
        <div className="p-5 border-b border-souklou-primary-800">
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo4.png" alt="Logo" className="h-6 w-auto" />
            <div>
              <div className="text-lg font-bold text-white tracking-tight">SOUKLOU</div>
              <div className="text-[10px] text-white/70 font-semibold">Gestion des Paiements Scolaire</div>
            </div>
          </div>
          <OrgButton />
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-3">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {section.title && (
                <div className="px-2 mb-1">
                  <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{section.title}</div>
                </div>
              )}
              {section.links.map((link) => {
                const isActive = pathname.startsWith(link.to)
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-souklou-primary-700 text-white shadow-sm"
                        : "text-white/90 hover:bg-souklou-primary-800"
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="text-sm font-semibold">{link.label}</span>
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-souklou-primary-800">
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-white hover:bg-souklou-primary-800 transition-all duration-300 w-full font-semibold">
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span className="text-sm">Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  )
}
