export type ServiceFeeRow = {
  id: string;
  service: string;
  price: string;
  duration: string;
  amount: string;
};

export type ServiceFeeSection = {
  id: string;
  title: string;
  rows: ServiceFeeRow[];
};

const SECTION_SEED: Record<string, Omit<ServiceFeeRow, "id">[]> = {
  accommodation: [
    {
      service: "Private Ward Bed 1",
      price: "N 3,000.00",
      duration: "2 days",
      amount: "N 7,500.00",
    },
    {
      service: "Children Ward",
      price: "N 3,000.00",
      duration: "2 days",
      amount: "N 7,500.00",
    },
    {
      service: "Executive Room 1",
      price: "N 3,000.00",
      duration: "2 days",
      amount: "N 7,500.00",
    },
  ],
  consultation: [
    {
      service: "Cardiologist",
      price: "N 3,000.00",
      duration: "1",
      amount: "N 3,000.00",
    },
    {
      service: "Dermatologist",
      price: "N 3,000.00",
      duration: "1",
      amount: "N 3,000.00",
    },
    {
      service: "G.P Consultation",
      price: "N 3,000.00",
      duration: "1",
      amount: "N 3,000.00",
    },
  ],
  feeding: [
    {
      service: "Breakfast Tray",
      price: "N 2,500.00",
      duration: "1 day",
      amount: "N 2,500.00",
    },
    {
      service: "Lunch Tray",
      price: "N 2,500.00",
      duration: "1 day",
      amount: "N 2,500.00",
    },
    {
      service: "Dinner Tray",
      price: "N 2,500.00",
      duration: "1 day",
      amount: "N 2,500.00",
    },
  ],
  immunization: [
    {
      service: "OPV",
      price: "N 5,000.00",
      duration: "1",
      amount: "N 5,000.00",
    },
    {
      service: "HBV",
      price: "N 7,500.00",
      duration: "1",
      amount: "N 7,500.00",
    },
    {
      service: "Vitamin A",
      price: "N 4,000.00",
      duration: "1",
      amount: "N 4,000.00",
    },
  ],
  investigation: [
    {
      service: "Full Blood Count",
      price: "N 8,000.00",
      duration: "1",
      amount: "N 8,000.00",
    },
    {
      service: "Urinalysis",
      price: "N 5,500.00",
      duration: "1",
      amount: "N 5,500.00",
    },
    {
      service: "X-Ray",
      price: "N 15,000.00",
      duration: "1",
      amount: "N 15,000.00",
    },
  ],
  medication: [
    {
      service: "Paracetamol 500mg",
      price: "N 1,200.00",
      duration: "5 days",
      amount: "N 6,000.00",
    },
    {
      service: "Amoxicillin 500mg",
      price: "N 2,500.00",
      duration: "7 days",
      amount: "N 17,500.00",
    },
    {
      service: "Vitamin C",
      price: "N 800.00",
      duration: "10 days",
      amount: "N 8,000.00",
    },
  ],
  registration: [
    {
      service: "New Patient Registration",
      price: "N 5,000.00",
      duration: "1",
      amount: "N 5,000.00",
    },
    {
      service: "Follow-up Registration",
      price: "N 2,500.00",
      duration: "1",
      amount: "N 2,500.00",
    },
    {
      service: "HMO Card Renewal",
      price: "N 3,000.00",
      duration: "1",
      amount: "N 3,000.00",
    },
  ],
  "other-services": [
    {
      service: "Medical Report",
      price: "N 10,000.00",
      duration: "1",
      amount: "N 10,000.00",
    },
    {
      service: "Ambulance Service",
      price: "N 25,000.00",
      duration: "1 trip",
      amount: "N 25,000.00",
    },
    {
      service: "Nursing Care",
      price: "N 5,000.00",
      duration: "1 day",
      amount: "N 5,000.00",
    },
  ],
};

export const SERVICE_FEE_SECTION_META: { id: string; title: string }[] = [
  { id: "accommodation", title: "ACCOMODATION" },
  { id: "consultation", title: "CONSULTATION" },
  { id: "feeding", title: "FEEDING" },
  { id: "immunization", title: "IMMUNIZATION" },
  { id: "investigation", title: "INVESTIGATION" },
  { id: "medication", title: "MEDICATION" },
  { id: "registration", title: "REGISTRATION" },
  { id: "other-services", title: "OTHER SERVICES" },
];

function buildSectionRows(sectionId: string): ServiceFeeRow[] {
  const seed = SECTION_SEED[sectionId] ?? [];
  return seed.map((row, index) => ({
    ...row,
    id: `${sectionId}-${index + 1}`,
  }));
}

export function buildMockServiceFeeSections(): ServiceFeeSection[] {
  return SERVICE_FEE_SECTION_META.map((section) => ({
    ...section,
    rows: buildSectionRows(section.id),
  }));
}
