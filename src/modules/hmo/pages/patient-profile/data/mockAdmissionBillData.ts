export type AdmissionBillRow = {
  id: string;
  service: string;
  rate: string;
  duration: string;
  amount: string;
};

export type AdmissionBillSection = {
  id: string;
  title: string;
  showCheckbox?: boolean;
  rows: AdmissionBillRow[];
};

export type AdmissionBillSummary = {
  totalAdmissionBill: number;
  deposit: number;
  discount: number;
  amountToPay: number;
};

/** Figma footer totals (node 3710:7403 / confirm modal 3710:8181). */
export const ADMISSION_BILL_SUMMARY: AdmissionBillSummary = {
  totalAdmissionBill: 358500,
  deposit: 0,
  discount: 7500,
  amountToPay: 351500,
};

const SECTION_SEED: {
  id: string;
  title: string;
  showCheckbox?: boolean;
  rows: Omit<AdmissionBillRow, "id">[];
}[] = [
  {
    id: "accommodation",
    title: "ACCOMODATION",
    rows: [
      {
        service: "Private Ward Bed 5",
        rate: "N 5,000.00",
        duration: "2",
        amount: "N 10,000.00",
      },
    ],
  },
  {
    id: "consultation",
    title: "CONSULTATION",
    rows: [
      {
        service: "General Consultation",
        rate: "N 3,000.00",
        duration: "1",
        amount: "N 3,000.00",
      },
      {
        service: "Dental Consultation",
        rate: "N 10,000.00",
        duration: "1",
        amount: "N 10,000.00",
      },
    ],
  },
  {
    id: "feeding",
    title: "FEEDING",
    showCheckbox: true,
    rows: [
      {
        service: "Feeding",
        rate: "N 2,000.00",
        duration: "4",
        amount: "N 8,000.00",
      },
    ],
  },
  {
    id: "investigations",
    title: "INVESTIGATIONS",
    rows: [
      {
        service: "Malaria Parasite",
        rate: "N 2,000.00",
        duration: "5",
        amount: "N 10,000.00",
      },
      {
        service: "Genotype",
        rate: "N 4,000.00",
        duration: "1",
        amount: "N 4,000.00",
      },
      {
        service: "Pelvic Scan",
        rate: "N 5,000.00",
        duration: "2",
        amount: "N 10,000.00",
      },
      {
        service: "Chest X-ray",
        rate: "N 5,000.00",
        duration: "1",
        amount: "N 5,000.00",
      },
    ],
  },
  {
    id: "procedures",
    title: "PROCEDURES",
    rows: [
      {
        service: "Laparotomy",
        rate: "N 100,000.00",
        duration: "1",
        amount: "N 100,000.00",
      },
      {
        service: "Tooth Removal",
        rate: "N 40,000.00",
        duration: "2",
        amount: "N 80,000.00",
      },
      {
        service: "Prosthetic Limb",
        rate: "N 50,000.00",
        duration: "2",
        amount: "N 100,000.00",
      },
      {
        service: "Nebulization",
        rate: "N 6,000.00",
        duration: "2",
        amount: "N 12,000.00",
      },
    ],
  },
  {
    id: "medication",
    title: "MEDICATION",
    rows: [
      {
        service: "Paracetamol 500MG",
        rate: "x2 xb.d x3",
        duration: "12 Days",
        amount: "N 2,000.00",
      },
      {
        service: "Oprofloacim Cream",
        rate: "x1 xstat x3",
        duration: "1 Day",
        amount: "N 1,000.00",
      },
      {
        service: "Cough Syrup 10mls",
        rate: "x2 xb.d x3",
        duration: "1 Day",
        amount: "N 3,000.00",
      },
    ],
  },
  {
    id: "other-services",
    title: "OTHER SERVICES",
    rows: [
      {
        service: "Ambulance",
        rate: "N 2,000.00",
        duration: "5",
        amount: "N 10,000.00",
      },
      {
        service: "Anaesthetist Fee",
        rate: "N 40,000.00",
        duration: "1",
        amount: "N 40,000.00",
      },
      {
        service: "Consumables/Usages",
        rate: "N 5,000.00",
        duration: "2",
        amount: "N 10,000.00",
      },
      {
        service: "Delivery Fee",
        rate: "N 5,000.00",
        duration: "1",
        amount: "N 5,000.00",
      },
      {
        service: "Incubator",
        rate: "N 5,000.00",
        duration: "1",
        amount: "N 5,000.00",
      },
      {
        service: "Nursing Care",
        rate: "N 5,000.00",
        duration: "1",
        amount: "N 5,000.00",
      },
    ],
  },
];

export function parseAmount(value: string): number {
  const cleaned = value.replace(/[^\d.]/g, "");
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatNaira(amount: number, withSymbol = false): string {
  const formatted = amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return withSymbol ? `₦${formatted}` : `N ${formatted}`;
}

export function getSectionTotal(section: AdmissionBillSection): number {
  return section.rows.reduce((sum, row) => sum + parseAmount(row.amount), 0);
}

export function buildMockAdmissionBillSections(): AdmissionBillSection[] {
  return SECTION_SEED.map((section) => ({
    id: section.id,
    title: section.title,
    showCheckbox: section.showCheckbox,
    rows: section.rows.map((row, index) => ({
      ...row,
      id: `${section.id}-${index + 1}`,
    })),
  }));
}
