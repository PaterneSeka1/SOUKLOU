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
  BellIcon,
} from "@heroicons/react/24/outline"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  // 🔹 Fake user/orgs (à remplacer par ton store plus tard)
  const user = {
    organizations: [
      { id: "1", name: "Groupe Scolaire ABC" },
      { id: "2", name: "Lycée Moderne XYZ" },
      { id: "3", name: "Collège Privé DEF" },
    ],
  }

  const hasMultipleOrgs = user.organizations.length > 1

  // 🔹 Sections alignées avec la plateforme de paiement SOUKLOU
  const sections = [
    {
      title: "Tableau de bord",
      links: [{ label: "Dashboard", icon: HomeIcon, to: "/admin/dashboard" }],
    },
    {
      title: "Paiements",
      links: [
        {
          label: "Transactions",
          icon: CreditCardIcon,
          to: "/admin/payments/transactions",
        },
        {
          label: "Plans de paiement",
          icon: AcademicCapIcon,
          to: "/admin/payments/plans",
        },
      ],
    },
    {
      title: "Gestion des Paiements Scolaire",
      links: [
        {
          label: "Écoles",
          icon: BuildingLibraryIcon,
          to: "/admin/schools",
        },
        {
          label: "Élèves",
          icon: ArrowUpTrayIcon,
          to: "/admin/students",
        },
        {
          label: "Parents d'élèves",
          icon: UserGroupIcon,
          to: "/admin/parents",
        },
      ],
    },
    {
      title: "Communication",
      links: [
        {
          label: "Annonces",
          icon: MegaphoneIcon,
          to: "/admin/announcements",
        },
        {
          label: "Notifications",
          icon: BellIcon,
          to: "/admin/notifications",
        },
      ],
    },
    {
      title: "Administration",
      links: [
        {
          label: "Membres de l'équipe",
          icon: UserPlusIcon,
          to: "/admin/teams",
        },
      ],
    },
    {
      title: "Compte",
      links: [{ label: "Profil", icon: UserIcon, to: "/admin/profil" }],
    },
  ]

  // 🔹 Animation mobile
  const [menuHeight, setMenuHeight] = useState(0)
  useEffect(() => {
    if (menuRef.current) {
      // Calculer la hauteur disponible (viewport height - navbar height)
      const viewportHeight = window.innerHeight
      const navbarHeight = 88 // hauteur de la navbar mobile
      setMenuHeight(viewportHeight - navbarHeight)
    }
  }, [isOpen])

  // 🔹 Fermer dropdown org au clic extérieur
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
            className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 font-semibold transition-all duration-300 hover:scale-[1.01] border border-white/20 shadow-sm backdrop-blur-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <BuildingLibraryIcon className="w-4 h-4" />
              </div>
              <span className="text-xs">Organisations</span>
            </div>
            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${orgDropdownOpen ? "rotate-180" : ""}`} />
          </button>
          {orgDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {user.organizations.map((org, index) => (
                <button
                  key={org.id}
                  onClick={() => handleSelectOrg(org.id)}
                  className={`w-full text-left px-3 py-2.5 hover:bg-gray-50 transition-all duration-200 text-xs font-medium text-gray-700 hover:text-[#2061D9] ${
                    index !== user.organizations.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2061D9]"></div>
                    {org.name}
                  </div>
                </button>
              ))}
              {/* Bouton d'ajout dans le dropdown */}
              <button
                onClick={() => {
                  console.log("Ajouter une nouvelle organisation")
                  setOrgDropdownOpen(false)
                }}
                className="w-full text-left px-3 py-2.5 bg-gray-50 hover:bg-gray-100 transition-all duration-200 text-xs font-semibold text-[#2061D9] border-t-2 border-gray-200"
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
        <button className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 font-semibold transition-all duration-300 hover:scale-[1.01] border border-white/20 shadow-sm backdrop-blur-sm">
          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
            <PlusIcon className="w-4 h-4" />
          </div>
          <span className="text-xs">Ajouter organisation</span>
        </button>
      )}
    </div>
  )

  return (
    <>
      {/* 🔹 NAVBAR MOBILE */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-lg px-6 py-5 flex items-center justify-between border-b-2 border-gray-100">
        <div className="flex items-center gap-3">
          {/* Logo ou icône dans mobile */}
          <div className="w-12 h-12 rounded-2xl bg-[#2061D9] flex items-center justify-center shadow-lg">
            <img src="/logo1.png" alt="Logo" className="h-8 w-auto" />
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900 tracking-tight">SOUKLOU</div>
            <div className="text-xs text-gray-500 font-medium">Gestion des Paiements Scolaire</div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-2xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 border-2 border-gray-200 hover:scale-110"
        >
          {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* 🔹 OVERLAY MOBILE */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 🔹 MENU MOBILE */}
      <div
        ref={menuRef}
        style={{
          maxHeight: isOpen ? `${menuHeight}px` : "0px",
        }}
        className="lg:hidden fixed top-[88px] left-0 right-0 bottom-0 z-40 bg-white overflow-y-auto transition-all duration-300 ease-out shadow-2xl border-b-2 border-gray-200"
      >
        <div className="p-6 space-y-6 pb-6">
          <OrgButton />

          {sections.map((section) => (
            <div key={section.title} className="space-y-3">
              <div className="flex items-center gap-2 px-2">
                <div className="h-1 w-1 rounded-full bg-[#2061D9]"></div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  {section.title}
                </div>
              </div>
              <div className="space-y-2">
                {section.links.map((link) => {
                  const isActive = pathname.startsWith(link.to)
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                        isActive
                          ? "bg-[#2061D9] text-white shadow-xl shadow-[#2061D9]/30 scale-[1.01]"
                          : "text-gray-700 hover:bg-gray-50 hover:scale-[1.01] border-2 border-transparent hover:border-gray-200"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? "bg-white/20 backdrop-blur-sm" 
                          : "bg-gray-100 group-hover:bg-gray-200"
                      }`}>
                        <link.icon className={`w-6 h-6 transition-transform duration-300 ${isActive ? "" : "group-hover:scale-110"}`} />
                      </div>
                      <span className="font-semibold">{link.label}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}

          <button className="flex items-center gap-4 px-5 py-4 rounded-2xl text-red-600 hover:bg-red-50 transition-all duration-300 w-full font-semibold border-2 border-transparent hover:border-red-200 hover:shadow-lg hover:shadow-red-500/10">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
            </div>
            Déconnexion
          </button>
        </div>
      </div>

      {/* 🔹 SIDEBAR DESKTOP */}
      <aside className="hidden lg:flex lg:flex-col fixed left-0 top-0 h-screen w-64 bg-[#2061D9] shadow-2xl z-30">
        {/* Header */}
        <div className="p-5 border-b-2 border-white/10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm shadow-lg flex items-center justify-center border-2 border-white/20">
              <img src="/logo4.png" alt="Logo" className="h-6 w-auto" />
            </div>
            <div>
              <div className="text-lg font-bold text-white tracking-tight">SOUKLOU</div>
              <div className="text-[10px] text-white/70 font-semibold">
                Gestion des Paiements Scolaire
              </div>
            </div>
          </div>
          <OrgButton />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          {sections.map((section) => (
            <div key={section.title} className="space-y-1.5">
              <div className="flex items-center gap-2 px-2 mb-2">
                <div className="h-1 w-1 rounded-full bg-white/50"></div>
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                  {section.title}
                </div>
              </div>
              <div className="space-y-1">
                {section.links.map((link) => {
                  const isActive = pathname.startsWith(link.to)
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-white text-[#2061D9] shadow-lg scale-[1.01]"
                          : "text-white/90 hover:bg-white/10 hover:scale-[1.01]"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? "bg-[#2061D9]/10" 
                          : "bg-white/10 group-hover:bg-white/20"
                      }`}>
                        <link.icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "" : "group-hover:scale-110"}`} />
                      </div>
                      <span className="font-semibold text-sm flex-1">{link.label}</span>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2061D9] animate-pulse"></div>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t-2 border-white/10">
          <button className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-white hover:bg-white/10 transition-all duration-300 w-full font-semibold hover:scale-[1.01]">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
              <ArrowRightOnRectangleIcon className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <span className="text-sm">Déconnexion</span>
          </button>
        </div>
      </aside>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          margin: 8px 0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          border: 2px solid transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </>
  )
}