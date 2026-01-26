import { useEffect, useRef, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import DataTable from "datatables.net-react"
import DT from "datatables.net-dt"
import { AdminLayout } from "@/layouts/AdminLayout"
import { XMarkIcon } from "@heroicons/react/24/outline"

import "datatables.net-dt/css/dataTables.dataTables.min.css"

DataTable.use(DT)

interface Student {
  id: number
  name: string
  classe: string
  matricule: string
  statut: "Actif" | "Inactif"
}

export const Route = createFileRoute("/admin/students")({
  component: StudentsRoute,
})

function StudentsRoute() {
  const [students, setStudents] = useState<Student[]>([])
  const [modalAdd, setModalAdd] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [selected, setSelected] = useState<Student | null>(null)

  const tableWrapperRef = useRef<HTMLDivElement>(null)

//   const students = [
//   { id: 1, name: "Jean Dupont", classe: "Terminale A", matricule: "MAT-001", statut: "Actif" },
//   { id: 2, name: "Aïcha Koné", classe: "Première D", matricule: "MAT-002", statut: "Actif" },
//   { id: 3, name: "Yao Kouassi", classe: "Seconde C", matricule: "MAT-003", statut: "Inactif" },
//   { id: 4, name: "Fatoumata Diallo", classe: "3ème B", matricule: "MAT-004", statut: "Actif" },
//   { id: 5, name: "Mohamed Traoré", classe: "4ème A", matricule: "MAT-005", statut: "Actif" },
//   { id: 6, name: "Koffi Assi", classe: "Terminale D", matricule: "MAT-006", statut: "Actif" },
//   { id: 7, name: "Aminata Coulibaly", classe: "Première C", matricule: "MAT-007", statut: "Actif" },
//   { id: 8, name: "Serge Yapi", classe: "Seconde A", matricule: "MAT-008", statut: "Inactif" },
//   { id: 9, name: "Mariame Konaté", classe: "3ème A", matricule: "MAT-009", statut: "Actif" },
//   { id: 10, name: "Ibrahim Ouattara", classe: "4ème B", matricule: "MAT-010", statut: "Actif" },

//   { id: 11, name: "Clarisse N'Guessan", classe: "Terminale C", matricule: "MAT-011", statut: "Actif" },
//   { id: 12, name: "Abdoulaye Bamba", classe: "Première A", matricule: "MAT-012", statut: "Actif" },
//   { id: 13, name: "Roseline Kadio", classe: "Seconde D", matricule: "MAT-013", statut: "Inactif" },
//   { id: 14, name: "Souleymane Fofana", classe: "3ème C", matricule: "MAT-014", statut: "Actif" },
//   { id: 15, name: "Nadine Aka", classe: "4ème C", matricule: "MAT-015", statut: "Actif" },
//   { id: 16, name: "Patrick Bohoussou", classe: "Terminale A", matricule: "MAT-016", statut: "Actif" },
//   { id: 17, name: "Hawa Touré", classe: "Première D", matricule: "MAT-017", statut: "Actif" },
//   { id: 18, name: "Junior Zadi", classe: "Seconde B", matricule: "MAT-018", statut: "Inactif" },
//   { id: 19, name: "Adama Diaby", classe: "3ème B", matricule: "MAT-019", statut: "Actif" },
//   { id: 20, name: "Salif Coulibaly", classe: "4ème A", matricule: "MAT-020", statut: "Actif" },

//   { id: 21, name: "Laetitia Kouamé", classe: "Terminale D", matricule: "MAT-021", statut: "Actif" },
//   { id: 22, name: "Ousmane Cissé", classe: "Première C", matricule: "MAT-022", statut: "Actif" },
//   { id: 23, name: "Arnaud Gnahoré", classe: "Seconde C", matricule: "MAT-023", statut: "Inactif" },
//   { id: 24, name: "Mariam Sanogo", classe: "3ème A", matricule: "MAT-024", statut: "Actif" },
//   { id: 25, name: "Issouf Konan", classe: "4ème B", matricule: "MAT-025", statut: "Actif" },
//   { id: 26, name: "Eric Bleou", classe: "Terminale C", matricule: "MAT-026", statut: "Actif" },
//   { id: 27, name: "Awa Sylla", classe: "Première A", matricule: "MAT-027", statut: "Actif" },
//   { id: 28, name: "Brice N'Dri", classe: "Seconde A", matricule: "MAT-028", statut: "Inactif" },
//   { id: 29, name: "Fanta Keita", classe: "3ème C", matricule: "MAT-029", statut: "Actif" },
//   { id: 30, name: "Moussa Traoré", classe: "4ème C", matricule: "MAT-030", statut: "Actif" },

//   { id: 31, name: "Kevin Amon", classe: "Terminale A", matricule: "MAT-031", statut: "Actif" },
//   { id: 32, name: "Rokia Diallo", classe: "Première D", matricule: "MAT-032", statut: "Actif" },
//   { id: 33, name: "Wilfried Yao", classe: "Seconde B", matricule: "MAT-033", statut: "Inactif" },
//   { id: 34, name: "Grace Koffi", classe: "3ème B", matricule: "MAT-034", statut: "Actif" },
//   { id: 35, name: "Bakary Camara", classe: "4ème A", matricule: "MAT-035", statut: "Actif" },
//   { id: 36, name: "Arlette Kouadio", classe: "Terminale D", matricule: "MAT-036", statut: "Actif" },
//   { id: 37, name: "Ismael Touré", classe: "Première C", matricule: "MAT-037", statut: "Actif" },
//   { id: 38, name: "Cedric Bley", classe: "Seconde C", matricule: "MAT-038", statut: "Inactif" },
//   { id: 39, name: "Djeneba Koné", classe: "3ème A", matricule: "MAT-039", statut: "Actif" },
//   { id: 40, name: "Alpha Barry", classe: "4ème B", matricule: "MAT-040", statut: "Actif" },

//   { id: 41, name: "Vanessa N'Zi", classe: "Terminale C", matricule: "MAT-041", statut: "Actif" },
//   { id: 42, name: "Sory Doumbia", classe: "Première A", matricule: "MAT-042", statut: "Actif" },
//   { id: 43, name: "Landry Aka", classe: "Seconde D", matricule: "MAT-043", statut: "Inactif" },
//   { id: 44, name: "Binta Sanogo", classe: "3ème C", matricule: "MAT-044", statut: "Actif" },
//   { id: 45, name: "Gaoussou Traoré", classe: "4ème C", matricule: "MAT-045", statut: "Actif" },
//   { id: 46, name: "Joel N'Da", classe: "Terminale A", matricule: "MAT-046", statut: "Actif" },
//   { id: 47, name: "Kadidia Keita", classe: "Première D", matricule: "MAT-047", statut: "Actif" },
//   { id: 48, name: "Romuald Guei", classe: "Seconde A", matricule: "MAT-048", statut: "Inactif" },
//   { id: 49, name: "Maimouna Cissé", classe: "3ème B", matricule: "MAT-049", statut: "Actif" },
//   { id: 50, name: "Abel Kouassi", classe: "4ème A", matricule: "MAT-050", statut: "Actif" },

//   { id: 51, name: "Seraphine Dago", classe: "Terminale D", matricule: "MAT-051", statut: "Actif" },
//   { id: 52, name: "Olivier Kone", classe: "Première C", matricule: "MAT-052", statut: "Actif" },
//   { id: 53, name: "Yannick Yapo", classe: "Seconde C", matricule: "MAT-053", statut: "Inactif" },
//   { id: 54, name: "Mariam Soumahoro", classe: "3ème A", matricule: "MAT-054", statut: "Actif" },
//   { id: 55, name: "Lassina Bamba", classe: "4ème B", matricule: "MAT-055", statut: "Actif" },
//   { id: 56, name: "Pauline Tano", classe: "Terminale C", matricule: "MAT-056", statut: "Actif" },
//   { id: 57, name: "Hermann Ble", classe: "Première A", matricule: "MAT-057", statut: "Actif" },
//   { id: 58, name: "Ines Kouakou", classe: "Seconde B", matricule: "MAT-058", statut: "Inactif" },
//   { id: 59, name: "Aly Diomandé", classe: "3ème C", matricule: "MAT-059", statut: "Actif" },
//   { id: 60, name: "Nestor Zobo", classe: "4ème C", matricule: "MAT-060", statut: "Actif" },

//   { id: 61, name: "Prisca Ehui", classe: "Terminale A", matricule: "MAT-061", statut: "Actif" },
//   { id: 62, name: "Brahima Koné", classe: "Première D", matricule: "MAT-062", statut: "Actif" },
//   { id: 63, name: "Steve Yoro", classe: "Seconde A", matricule: "MAT-063", statut: "Inactif" },
//   { id: 64, name: "Rebecca Ahou", classe: "3ème B", matricule: "MAT-064", statut: "Actif" },
//   { id: 65, name: "Aboubacar Fofana", classe: "4ème A", matricule: "MAT-065", statut: "Actif" },
//   { id: 66, name: "Elsa N'Guessan", classe: "Terminale D", matricule: "MAT-066", statut: "Actif" },
//   { id: 67, name: "Mamadou Sissoko", classe: "Première C", matricule: "MAT-067", statut: "Actif" },
//   { id: 68, name: "Loic Amani", classe: "Seconde C", matricule: "MAT-068", statut: "Inactif" },
//   { id: 69, name: "Kadiatou Diallo", classe: "3ème A", matricule: "MAT-069", statut: "Actif" },
//   { id: 70, name: "Wilfried Kouadio", classe: "4ème B", matricule: "MAT-070", statut: "Actif" },

//   { id: 71, name: "Arsene Gohi", classe: "Terminale C", matricule: "MAT-071", statut: "Actif" },
//   { id: 72, name: "Nabila Traoré", classe: "Première A", matricule: "MAT-072", statut: "Actif" },
//   { id: 73, name: "Gael Yoboue", classe: "Seconde D", matricule: "MAT-073", statut: "Inactif" },
//   { id: 74, name: "Safiatou Konaté", classe: "3ème C", matricule: "MAT-074", statut: "Actif" },
//   { id: 75, name: "Moussa Kone", classe: "4ème C", matricule: "MAT-075", statut: "Actif" },
//   { id: 76, name: "Junior Kouakou", classe: "Terminale A", matricule: "MAT-076", statut: "Actif" },
//   { id: 77, name: "Aïssata Soumahoro", classe: "Première D", matricule: "MAT-077", statut: "Actif" },
//   { id: 78, name: "Franck Bohui", classe: "Seconde B", matricule: "MAT-078", statut: "Inactif" },
//   { id: 79, name: "Ramatoulaye Barry", classe: "3ème B", matricule: "MAT-079", statut: "Actif" },
//   { id: 80, name: "Gaston N'Dri", classe: "4ème A", matricule: "MAT-080", statut: "Actif" },

//   { id: 81, name: "Melanie Kouassi", classe: "Terminale D", matricule: "MAT-081", statut: "Actif" },
//   { id: 82, name: "Souleyman Camara", classe: "Première C", matricule: "MAT-082", statut: "Actif" },
//   { id: 83, name: "Jonathan Aka", classe: "Seconde A", matricule: "MAT-083", statut: "Inactif" },
//   { id: 84, name: "Hindou Cissé", classe: "3ème A", matricule: "MAT-084", statut: "Actif" },
//   { id: 85, name: "Adel Kouamé", classe: "4ème B", matricule: "MAT-085", statut: "Actif" },
//   { id: 86, name: "Esther Kpan", classe: "Terminale C", matricule: "MAT-086", statut: "Actif" },
//   { id: 87, name: "Boris Yapi", classe: "Première A", matricule: "MAT-087", statut: "Actif" },
//   { id: 88, name: "Nourou Diarra", classe: "Seconde C", matricule: "MAT-088", statut: "Inactif" },
//   { id: 89, name: "Aminata Bado", classe: "3ème C", matricule: "MAT-089", statut: "Actif" },
//   { id: 90, name: "Mathias Zogbo", classe: "4ème C", matricule: "MAT-090", statut: "Actif" },

//   { id: 91, name: "Yvette Kouassi", classe: "Terminale A", matricule: "MAT-091", statut: "Actif" },
//   { id: 92, name: "Amadou Diallo", classe: "Première D", matricule: "MAT-092", statut: "Actif" },
//   { id: 93, name: "Cedrine N'Cho", classe: "Seconde B", matricule: "MAT-093", statut: "Inactif" },
//   { id: 94, name: "Abla Touré", classe: "3ème B", matricule: "MAT-094", statut: "Actif" },
//   { id: 95, name: "Issa Fofana", classe: "4ème A", matricule: "MAT-095", statut: "Actif" },
//   { id: 96, name: "Caroline Gnaore", classe: "Terminale D", matricule: "MAT-096", statut: "Actif" },
//   { id: 97, name: "Saliou Koné", classe: "Première C", matricule: "MAT-097", statut: "Actif" },
//   { id: 98, name: "Didier Kouadio", classe: "Seconde A", matricule: "MAT-098", statut: "Inactif" },
//   { id: 99, name: "Fatima Diaby", classe: "3ème A", matricule: "MAT-099", statut: "Actif" },
//   { id: 100, name: "Estelle Dago", classe: "Terminale A", matricule: "MAT-100", statut: "Actif" }
// ]


  useEffect(() => {
    setStudents([
  { id: 1, name: "Jean Dupont", classe: "Terminale A", matricule: "MAT-001", statut: "Actif" },
  { id: 2, name: "Aïcha Koné", classe: "Première D", matricule: "MAT-002", statut: "Actif" },
  { id: 3, name: "Yao Kouassi", classe: "Seconde C", matricule: "MAT-003", statut: "Inactif" },
  { id: 4, name: "Fatoumata Diallo", classe: "3ème B", matricule: "MAT-004", statut: "Actif" },
  { id: 5, name: "Mohamed Traoré", classe: "4ème A", matricule: "MAT-005", statut: "Actif" },
  { id: 6, name: "Koffi Assi", classe: "Terminale D", matricule: "MAT-006", statut: "Actif" },
  { id: 7, name: "Aminata Coulibaly", classe: "Première C", matricule: "MAT-007", statut: "Actif" },
  { id: 8, name: "Serge Yapi", classe: "Seconde A", matricule: "MAT-008", statut: "Inactif" },
  { id: 9, name: "Mariame Konaté", classe: "3ème A", matricule: "MAT-009", statut: "Actif" },
  { id: 10, name: "Ibrahim Ouattara", classe: "4ème B", matricule: "MAT-010", statut: "Actif" },

  { id: 11, name: "Clarisse N'Guessan", classe: "Terminale C", matricule: "MAT-011", statut: "Actif" },
  { id: 12, name: "Abdoulaye Bamba", classe: "Première A", matricule: "MAT-012", statut: "Actif" },
  { id: 13, name: "Roseline Kadio", classe: "Seconde D", matricule: "MAT-013", statut: "Inactif" },
  { id: 14, name: "Souleymane Fofana", classe: "3ème C", matricule: "MAT-014", statut: "Actif" },
  { id: 15, name: "Nadine Aka", classe: "4ème C", matricule: "MAT-015", statut: "Actif" },
  { id: 16, name: "Patrick Bohoussou", classe: "Terminale A", matricule: "MAT-016", statut: "Actif" },
  { id: 17, name: "Hawa Touré", classe: "Première D", matricule: "MAT-017", statut: "Actif" },
  { id: 18, name: "Junior Zadi", classe: "Seconde B", matricule: "MAT-018", statut: "Inactif" },
  { id: 19, name: "Adama Diaby", classe: "3ème B", matricule: "MAT-019", statut: "Actif" },
  { id: 20, name: "Salif Coulibaly", classe: "4ème A", matricule: "MAT-020", statut: "Actif" },

  { id: 21, name: "Laetitia Kouamé", classe: "Terminale D", matricule: "MAT-021", statut: "Actif" },
  { id: 22, name: "Ousmane Cissé", classe: "Première C", matricule: "MAT-022", statut: "Actif" },
  { id: 23, name: "Arnaud Gnahoré", classe: "Seconde C", matricule: "MAT-023", statut: "Inactif" },
  { id: 24, name: "Mariam Sanogo", classe: "3ème A", matricule: "MAT-024", statut: "Actif" },
  { id: 25, name: "Issouf Konan", classe: "4ème B", matricule: "MAT-025", statut: "Actif" },
  { id: 26, name: "Eric Bleou", classe: "Terminale C", matricule: "MAT-026", statut: "Actif" },
  { id: 27, name: "Awa Sylla", classe: "Première A", matricule: "MAT-027", statut: "Actif" },
  { id: 28, name: "Brice N'Dri", classe: "Seconde A", matricule: "MAT-028", statut: "Inactif" },
  { id: 29, name: "Fanta Keita", classe: "3ème C", matricule: "MAT-029", statut: "Actif" },
  { id: 30, name: "Moussa Traoré", classe: "4ème C", matricule: "MAT-030", statut: "Actif" },

  { id: 31, name: "Kevin Amon", classe: "Terminale A", matricule: "MAT-031", statut: "Actif" },
  { id: 32, name: "Rokia Diallo", classe: "Première D", matricule: "MAT-032", statut: "Actif" },
  { id: 33, name: "Wilfried Yao", classe: "Seconde B", matricule: "MAT-033", statut: "Inactif" },
  { id: 34, name: "Grace Koffi", classe: "3ème B", matricule: "MAT-034", statut: "Actif" },
  { id: 35, name: "Bakary Camara", classe: "4ème A", matricule: "MAT-035", statut: "Actif" },
  { id: 36, name: "Arlette Kouadio", classe: "Terminale D", matricule: "MAT-036", statut: "Actif" },
  { id: 37, name: "Ismael Touré", classe: "Première C", matricule: "MAT-037", statut: "Actif" },
  { id: 38, name: "Cedric Bley", classe: "Seconde C", matricule: "MAT-038", statut: "Inactif" },
  { id: 39, name: "Djeneba Koné", classe: "3ème A", matricule: "MAT-039", statut: "Actif" },
  { id: 40, name: "Alpha Barry", classe: "4ème B", matricule: "MAT-040", statut: "Actif" },

  { id: 41, name: "Vanessa N'Zi", classe: "Terminale C", matricule: "MAT-041", statut: "Actif" },
  { id: 42, name: "Sory Doumbia", classe: "Première A", matricule: "MAT-042", statut: "Actif" },
  { id: 43, name: "Landry Aka", classe: "Seconde D", matricule: "MAT-043", statut: "Inactif" },
  { id: 44, name: "Binta Sanogo", classe: "3ème C", matricule: "MAT-044", statut: "Actif" },
  { id: 45, name: "Gaoussou Traoré", classe: "4ème C", matricule: "MAT-045", statut: "Actif" },
  { id: 46, name: "Joel N'Da", classe: "Terminale A", matricule: "MAT-046", statut: "Actif" },
  { id: 47, name: "Kadidia Keita", classe: "Première D", matricule: "MAT-047", statut: "Actif" },
  { id: 48, name: "Romuald Guei", classe: "Seconde A", matricule: "MAT-048", statut: "Inactif" },
  { id: 49, name: "Maimouna Cissé", classe: "3ème B", matricule: "MAT-049", statut: "Actif" },
  { id: 50, name: "Abel Kouassi", classe: "4ème A", matricule: "MAT-050", statut: "Actif" },

  { id: 51, name: "Seraphine Dago", classe: "Terminale D", matricule: "MAT-051", statut: "Actif" },
  { id: 52, name: "Olivier Kone", classe: "Première C", matricule: "MAT-052", statut: "Actif" },
  { id: 53, name: "Yannick Yapo", classe: "Seconde C", matricule: "MAT-053", statut: "Inactif" },
  { id: 54, name: "Mariam Soumahoro", classe: "3ème A", matricule: "MAT-054", statut: "Actif" },
  { id: 55, name: "Lassina Bamba", classe: "4ème B", matricule: "MAT-055", statut: "Actif" },
  { id: 56, name: "Pauline Tano", classe: "Terminale C", matricule: "MAT-056", statut: "Actif" },
  { id: 57, name: "Hermann Ble", classe: "Première A", matricule: "MAT-057", statut: "Actif" },
  { id: 58, name: "Ines Kouakou", classe: "Seconde B", matricule: "MAT-058", statut: "Inactif" },
  { id: 59, name: "Aly Diomandé", classe: "3ème C", matricule: "MAT-059", statut: "Actif" },
  { id: 60, name: "Nestor Zobo", classe: "4ème C", matricule: "MAT-060", statut: "Actif" },

  { id: 61, name: "Prisca Ehui", classe: "Terminale A", matricule: "MAT-061", statut: "Actif" },
  { id: 62, name: "Brahima Koné", classe: "Première D", matricule: "MAT-062", statut: "Actif" },
  { id: 63, name: "Steve Yoro", classe: "Seconde A", matricule: "MAT-063", statut: "Inactif" },
  { id: 64, name: "Rebecca Ahou", classe: "3ème B", matricule: "MAT-064", statut: "Actif" },
  { id: 65, name: "Aboubacar Fofana", classe: "4ème A", matricule: "MAT-065", statut: "Actif" },
  { id: 66, name: "Elsa N'Guessan", classe: "Terminale D", matricule: "MAT-066", statut: "Actif" },
  { id: 67, name: "Mamadou Sissoko", classe: "Première C", matricule: "MAT-067", statut: "Actif" },
  { id: 68, name: "Loic Amani", classe: "Seconde C", matricule: "MAT-068", statut: "Inactif" },
  { id: 69, name: "Kadiatou Diallo", classe: "3ème A", matricule: "MAT-069", statut: "Actif" },
  { id: 70, name: "Wilfried Kouadio", classe: "4ème B", matricule: "MAT-070", statut: "Actif" },

  { id: 71, name: "Arsene Gohi", classe: "Terminale C", matricule: "MAT-071", statut: "Actif" },
  { id: 72, name: "Nabila Traoré", classe: "Première A", matricule: "MAT-072", statut: "Actif" },
  { id: 73, name: "Gael Yoboue", classe: "Seconde D", matricule: "MAT-073", statut: "Inactif" },
  { id: 74, name: "Safiatou Konaté", classe: "3ème C", matricule: "MAT-074", statut: "Actif" },
  { id: 75, name: "Moussa Kone", classe: "4ème C", matricule: "MAT-075", statut: "Actif" },
  { id: 76, name: "Junior Kouakou", classe: "Terminale A", matricule: "MAT-076", statut: "Actif" },
  { id: 77, name: "Aïssata Soumahoro", classe: "Première D", matricule: "MAT-077", statut: "Actif" },
  { id: 78, name: "Franck Bohui", classe: "Seconde B", matricule: "MAT-078", statut: "Inactif" },
  { id: 79, name: "Ramatoulaye Barry", classe: "3ème B", matricule: "MAT-079", statut: "Actif" },
  { id: 80, name: "Gaston N'Dri", classe: "4ème A", matricule: "MAT-080", statut: "Actif" },

  { id: 81, name: "Melanie Kouassi", classe: "Terminale D", matricule: "MAT-081", statut: "Actif" },
  { id: 82, name: "Souleyman Camara", classe: "Première C", matricule: "MAT-082", statut: "Actif" },
  { id: 83, name: "Jonathan Aka", classe: "Seconde A", matricule: "MAT-083", statut: "Inactif" },
  { id: 84, name: "Hindou Cissé", classe: "3ème A", matricule: "MAT-084", statut: "Actif" },
  { id: 85, name: "Adel Kouamé", classe: "4ème B", matricule: "MAT-085", statut: "Actif" },
  { id: 86, name: "Esther Kpan", classe: "Terminale C", matricule: "MAT-086", statut: "Actif" },
  { id: 87, name: "Boris Yapi", classe: "Première A", matricule: "MAT-087", statut: "Actif" },
  { id: 88, name: "Nourou Diarra", classe: "Seconde C", matricule: "MAT-088", statut: "Inactif" },
  { id: 89, name: "Aminata Bado", classe: "3ème C", matricule: "MAT-089", statut: "Actif" },
  { id: 90, name: "Mathias Zogbo", classe: "4ème C", matricule: "MAT-090", statut: "Actif" },

  { id: 91, name: "Yvette Kouassi", classe: "Terminale A", matricule: "MAT-091", statut: "Actif" },
  { id: 92, name: "Amadou Diallo", classe: "Première D", matricule: "MAT-092", statut: "Actif" },
  { id: 93, name: "Cedrine N'Cho", classe: "Seconde B", matricule: "MAT-093", statut: "Inactif" },
  { id: 94, name: "Abla Touré", classe: "3ème B", matricule: "MAT-094", statut: "Actif" },
  { id: 95, name: "Issa Fofana", classe: "4ème A", matricule: "MAT-095", statut: "Actif" },
  { id: 96, name: "Caroline Gnaore", classe: "Terminale D", matricule: "MAT-096", statut: "Actif" },
  { id: 97, name: "Saliou Koné", classe: "Première C", matricule: "MAT-097", statut: "Actif" },
  { id: 98, name: "Didier Kouadio", classe: "Seconde A", matricule: "MAT-098", statut: "Inactif" },
  { id: 99, name: "Fatima Diaby", classe: "3ème A", matricule: "MAT-099", statut: "Actif" },
  { id: 100, name: "Estelle Dago", classe: "Terminale A", matricule: "MAT-100", statut: "Actif" }
])
  }, [])

  /* ================= EVENT DELEGATION ================= */

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const btn = target.closest("button[data-action]") as HTMLButtonElement
      if (!btn) return

      const id = Number(btn.dataset.id)
      const action = btn.dataset.action
      const student = students.find((s) => s.id === id)
      if (!student) return

      if (action === "edit") {
        setSelected({ ...student })
        setModalEdit(true)
      }

      if (action === "delete") {
        setSelected(student)
        setModalDelete(true)
      }
    }

    const el = tableWrapperRef.current
    el?.addEventListener("click", handler)
    return () => el?.removeEventListener("click", handler)
  }, [students])

  /* ================= CRUD ================= */

  const addStudent = (student: Student) => {
    setStudents((prev) => [...prev, { ...student, id: Date.now() }])
    setModalAdd(false)
  }

  const saveEdit = () => {
    setStudents((prev) =>
      prev.map((s) => (s.id === selected!.id ? selected! : s))
    )
    setModalEdit(false)
  }

  const deleteStudent = () => {
    setStudents((prev) => prev.filter((s) => s.id !== selected!.id))
    setModalDelete(false)
  }

  const badge = (s: Student["statut"]) =>
    s === "Actif"
      ? `<span class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Actif</span>`
      : `<span class="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">Inactif</span>`

  return (
    <AdminLayout>
      <div className="bg-white rounded-2xl shadow p-6" ref={tableWrapperRef}>
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Élèves</h1>
          <button
            onClick={() => setModalAdd(true)}
            className="px-4 py-2 bg-souklou-primary-600 text-white rounded-lg"
          >
            + Ajouter élève
          </button>
        </div>

        {/* TABLE */}
        <DataTable
          className="display"
          data={students.map((s) => [
            s.name,
            s.classe,
            s.matricule,
            badge(s.statut),
            `
              <div class="flex gap-2">
                <button data-action="edit" data-id="${s.id}">✏️</button>
                <button data-action="delete" data-id="${s.id}">🗑</button>
              </div>
            `,
          ])}
          options={{
            columnDefs: [{ targets: -1, orderable: false }],
            language: {
              search: "Rechercher :",
              emptyTable: "Aucun élève",
            },
          }}
        >
          <thead>
            <tr>
              <th>Nom</th>
              <th>Classe</th>
              <th>Matricule</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
        </DataTable>
      </div>

      {/* MODAL AJOUT */}
      {modalAdd && (
        <StudentModal
          title="Ajouter un élève"
          onClose={() => setModalAdd(false)}
          onSubmit={addStudent}
        />
      )}

      {/* MODAL ÉDITION */}
      {modalEdit && selected && (
        <StudentModal
          title="Modifier l’élève"
          student={selected}
          onClose={() => setModalEdit(false)}
          onSubmit={(s) => {
            setSelected(s)
            saveEdit()
          }}
        />
      )}

      {/* MODAL SUPPRESSION */}
      {modalDelete && selected && (
        <ConfirmModal
          message={`Supprimer ${selected.name} ?`}
          onCancel={() => setModalDelete(false)}
          onConfirm={deleteStudent}
        />
      )}
    </AdminLayout>
  )
}

/* ================= MODALS ================= */

function StudentModal({ title, student, onSubmit, onClose }: any) {
  const [form, setForm] = useState<Student>(
    student ?? { id: 0, name: "", classe: "", matricule: "", statut: "Actif" }
  )

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold">{title}</h2>
          <button onClick={onClose}>
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <input
          className="w-full p-3 border rounded-lg mb-3"
          placeholder="Nom"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full p-3 border rounded-lg mb-3"
          placeholder="Classe"
          value={form.classe}
          onChange={(e) => setForm({ ...form, classe: e.target.value })}
        />

        <input
          className="w-full p-3 border rounded-lg mb-3"
          placeholder="Matricule"
          value={form.matricule}
          onChange={(e) => setForm({ ...form, matricule: e.target.value })}
        />

        <select
          className="w-full p-3 border rounded-lg mb-4"
          value={form.statut}
          onChange={(e) =>
            setForm({ ...form, statut: e.target.value as Student["statut"] })
          }
        >
          <option>Actif</option>
          <option>Inactif</option>
        </select>

        <button
          onClick={() => onSubmit(form)}
          className="w-full bg-souklou-primary-600 text-white py-3 rounded-lg"
        >
          Enregistrer
        </button>
      </div>
    </div>
  )
}

function ConfirmModal({ message, onConfirm, onCancel }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel}>Annuler</button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}
