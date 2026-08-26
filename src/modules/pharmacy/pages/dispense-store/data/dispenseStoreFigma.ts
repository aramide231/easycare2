export type DispenseStoreRow = {
  id: number;
  name: string;
  medCategory: string;
  medType: string;
  costPrice: number;
  sellingPrice: number;
  expiryDate: string;
};

/** Dispense Store — Figma frame (10 rows). */
export const DISPENSE_STORE_ROWS: DispenseStoreRow[] = [
  {
    id: 1,
    name: "AB Artemether Injection Ampoules",
    medCategory: "Anti-Bacteria",
    medType: "Pain Reliever",
    costPrice: 10,
    sellingPrice: 100,
    expiryDate: "00-00-0000",
  },
  {
    id: 2,
    name: "Abacavir (ABC) Liquid",
    medCategory: "Anti-Viral",
    medType: "Viral Infection",
    costPrice: 20,
    sellingPrice: 200,
    expiryDate: "00-00-0000",
  },
  {
    id: 3,
    name: "Acetazolamide Tablet",
    medCategory: "Anti-Fungal",
    medType: "Fungal Infection",
    costPrice: 30,
    sellingPrice: 300,
    expiryDate: "00-00-0000",
  },
  {
    id: 4,
    name: "Acetylsalicylic Acid Tablet",
    medCategory: "Anti-Inflammatory",
    medType: "Pain Reliever",
    costPrice: 40,
    sellingPrice: 400,
    expiryDate: "00-00-0000",
  },
  {
    id: 5,
    name: "Aciclovir Cream",
    medCategory: "Anti-Viral",
    medType: "Viral Infection",
    costPrice: 50,
    sellingPrice: 500,
    expiryDate: "00-00-0000",
  },
  {
    id: 6,
    name: "Albendazole Tablet",
    medCategory: "Anti-Parasitic",
    medType: "Worm Infection",
    costPrice: 60,
    sellingPrice: 600,
    expiryDate: "00-00-0000",
  },
  {
    id: 7,
    name: "Amoxicillin Capsule",
    medCategory: "Anti-Bacteria",
    medType: "Bacterial Infection",
    costPrice: 70,
    sellingPrice: 700,
    expiryDate: "00-00-0000",
  },
  {
    id: 8,
    name: "Ampicillin Capsule",
    medCategory: "Anti-Bacteria",
    medType: "Bacterial Infection",
    costPrice: 80,
    sellingPrice: 800,
    expiryDate: "00-00-0000",
  },
  {
    id: 9,
    name: "Artemether Lumefantrine Tablet",
    medCategory: "Anti-Malarial",
    medType: "Malaria",
    costPrice: 90,
    sellingPrice: 900,
    expiryDate: "00-00-0000",
  },
  {
    id: 10,
    name: "Azithromycin Tablet",
    medCategory: "Anti-Bacteria",
    medType: "Bacterial Infection",
    costPrice: 100,
    sellingPrice: 1000,
    expiryDate: "00-00-0000",
  },
];

/** Default range label shown in Figma: 25/03/2025 - 28/03/2025 */
export const DISPENSE_STORE_DEFAULT_RANGE = {
  startDate: new Date(2025, 2, 25),
  endDate: new Date(2025, 2, 28),
};
