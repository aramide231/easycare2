import { mockVisitAtCurrentMonth } from "@/lib/dateTime";
import { MOCK_HMO_LIST_TOTAL } from "@hmo/pages/shared/lib/pagination";

export type AccountReviewRecord = {
  id: number;
  name: string;
  patientId: string;
  phoneNumber: string;
  date: string;
  time: string;
  accumulatedTotal: number;
  amountPaid: number;
  outstanding: number;
  senderName: string;
};

type SeedRow = Omit<AccountReviewRecord, "id" | "date" | "time">;

const SEED: SeedRow[] = [
  {
    name: "Adeola Abimbola",
    patientId: "P-2025002",
    phoneNumber: "08023456789",
    accumulatedTotal: 100000,
    amountPaid: 80000,
    outstanding: 1000,
    senderName: "Titilayo Olayinka",
  },
  {
    name: "Chinwe Eze",
    patientId: "P-2025003",
    phoneNumber: "07034567890",
    accumulatedTotal: 200000,
    amountPaid: 150000,
    outstanding: 2000,
    senderName: "Bayo Hammed",
  },
  {
    name: "Femi Johnson",
    patientId: "P-2025004",
    phoneNumber: "09045678901",
    accumulatedTotal: 300000,
    amountPaid: 250000,
    outstanding: 3500,
    senderName: "Sarah Obasi",
  },
  {
    name: "Tolu Akinwunmi",
    patientId: "P-2025005",
    phoneNumber: "08056789012",
    accumulatedTotal: 150000,
    amountPaid: 120000,
    outstanding: 1500,
    senderName: "Kemi Balogun",
  },
  {
    name: "Ngozi Madueke",
    patientId: "P-2025006",
    phoneNumber: "07067890123",
    accumulatedTotal: 250000,
    amountPaid: 200000,
    outstanding: 2500,
    senderName: "David Ibe",
  },
  {
    name: "Emeka Nwankwo",
    patientId: "P-2025007",
    phoneNumber: "09078901234",
    accumulatedTotal: 400000,
    amountPaid: 350000,
    outstanding: 5000,
    senderName: "Joyce Alabi",
  },
  {
    name: "Simi Adeyemi",
    patientId: "P-2025008",
    phoneNumber: "08089012345",
    accumulatedTotal: 180000,
    amountPaid: 140000,
    outstanding: 1800,
    senderName: "Peter Ogunleye",
  },
  {
    name: "Tunde Bakare",
    patientId: "P-2025009",
    phoneNumber: "07090123456",
    accumulatedTotal: 120000,
    amountPaid: 100000,
    outstanding: 1200,
    senderName: "Funmi Adeola",
  },
  {
    name: "Zainab Ibrahim",
    patientId: "P-2025010",
    phoneNumber: "09001234567",
    accumulatedTotal: 350000,
    amountPaid: 300000,
    outstanding: 4000,
    senderName: "Moses Okoro",
  },
];

export function formatAccountAmount(amount: number): string {
  return amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function buildMockAccountReviewRecords(): AccountReviewRecord[] {
  const records: AccountReviewRecord[] = SEED.map((row, index) => {
    const { date, time } = mockVisitAtCurrentMonth(index);
    return {
      ...row,
      id: index + 1,
      date,
      time,
    };
  });

  for (let i = SEED.length; i < MOCK_HMO_LIST_TOTAL; i += 1) {
    const base = SEED[i % SEED.length];
    const { date, time } = mockVisitAtCurrentMonth(i);
    records.push({
      ...base,
      id: i + 1,
      patientId: `P-2025${String(i + 2).padStart(3, "0")}`,
      phoneNumber: `090${String(10000000 + i).slice(-8)}`,
      accumulatedTotal: base.accumulatedTotal + i * 1000,
      amountPaid: base.amountPaid + i * 500,
      outstanding: base.outstanding + i * 100,
      date,
      time,
    });
  }

  return records;
}

export function parseAccountReviewDate(dateStr: string): Date {
  return new Date(dateStr.replace(/-/g, " "));
}
