export type MainStoreRow = {
  id: number;
  date: string;
  time: string;
  name: string;
  medCategory: string;
  medType: string;
  costPrice: number;
  sellingPrice: number;
};

/** Main Store — Figma frame (10 rows). */
export const MAIN_STORE_ROWS: MainStoreRow[] = [
  {
    id: 1,
    date: "12-Mar-2025",
    time: "11:01 AM",
    name: "AB Artemether Injection",
    medCategory: "Anti-Bacteria",
    medType: "Pain Reliever",
    costPrice: 10,
    sellingPrice: 100,
  },
  {
    id: 2,
    date: "12-Mar-2025",
    time: "11:02 AM",
    name: "Abacavir",
    medCategory: "Anti-Viral",
    medType: "Viral Infection",
    costPrice: 20,
    sellingPrice: 200,
  },
  {
    id: 3,
    date: "12-Mar-2025",
    time: "11:03 AM",
    name: "Acetazolamide",
    medCategory: "Anti-Fungal",
    medType: "Fungal Infection",
    costPrice: 30,
    sellingPrice: 300,
  },
  {
    id: 4,
    date: "12-Mar-2025",
    time: "11:04 AM",
    name: "Acetylsalicylic Acid",
    medCategory: "Anti-Inflammatory",
    medType: "Pain Reliever",
    costPrice: 40,
    sellingPrice: 400,
  },
  {
    id: 5,
    date: "12-Mar-2025",
    time: "11:05 AM",
    name: "Aciclovir",
    medCategory: "Anti-Viral",
    medType: "Viral Infection",
    costPrice: 50,
    sellingPrice: 500,
  },
  {
    id: 6,
    date: "12-Mar-2025",
    time: "11:06 AM",
    name: "Albendazole",
    medCategory: "Anti-Parasitic",
    medType: "Worm Infection",
    costPrice: 60,
    sellingPrice: 600,
  },
  {
    id: 7,
    date: "12-Mar-2025",
    time: "11:07 AM",
    name: "Amoxicillin",
    medCategory: "Anti-Bacteria",
    medType: "Bacterial Infection",
    costPrice: 70,
    sellingPrice: 700,
  },
  {
    id: 8,
    date: "12-Mar-2025",
    time: "11:08 AM",
    name: "Ampicillin",
    medCategory: "Anti-Bacteria",
    medType: "Bacterial Infection",
    costPrice: 80,
    sellingPrice: 800,
  },
  {
    id: 9,
    date: "12-Mar-2025",
    time: "11:09 AM",
    name: "Artemether Lumefantrine",
    medCategory: "Anti-Malarial",
    medType: "Malaria",
    costPrice: 90,
    sellingPrice: 900,
  },
  {
    id: 10,
    date: "12-Mar-2025",
    time: "11:10 AM",
    name: "Azithromycin",
    medCategory: "Anti-Bacteria",
    medType: "Bacterial Infection",
    costPrice: 100,
    sellingPrice: 1000,
  },
];

/** Default range label shown in Figma: 25/03/2025 - 28/03/2025 */
export const MAIN_STORE_DEFAULT_RANGE = {
  startDate: new Date(2025, 2, 25),
  endDate: new Date(2025, 2, 28),
};
