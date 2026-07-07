import {
  dateAtDaysAgo,
  formatLogDate,
  formatLogDateTime,
  formatLogTime,
} from "@/lib/dateTime";

export type DispensedMedicationLine = {
  name: string;
  strength: string;
  dosage: number;
  interval: string;
  duration: string;
  qty: number;
};

export type DispensedVisitRecord = {
  id: string;
  dateTime: string;
  date: Date;
  name: string;
  patientId: string;
  patientType: string;
  gender: string;
  age: number;
  complaints: string;
  diagnosis: string;
  staffName: string;
  clinicianName: string;
  medications: DispensedMedicationLine[];
};

export type DispensedMedicationRow = DispensedVisitRecord & {
  rowId: string;
  medicationName: string;
  qtyGiven: number;
};

export function formatMedicationLine(med: DispensedMedicationLine): string {
  const label = med.strength ? `${med.name} ${med.strength}` : med.name;
  return `${label} x ${med.dosage} x ${med.interval} x ${med.duration} x ${med.qty}`;
}

const ayoMedications: DispensedMedicationLine[] = [
  {
    name: "PCM TAB",
    strength: "500MG",
    dosage: 2,
    interval: "t.d.s",
    duration: "3/7",
    qty: 18,
  },
  {
    name: "Loperamide",
    strength: "2MG",
    dosage: 1,
    interval: "stat",
    duration: "1/7",
    qty: 1,
  },
  {
    name: "CIPRO",
    strength: "500MG",
    dosage: 2,
    interval: "b.d",
    duration: "5/7",
    qty: 10,
  },
  {
    name: "D. Cough Syrup",
    strength: "",
    dosage: 2,
    interval: "b.d",
    duration: "3/7",
    qty: 1,
  },
  {
    name: "Arth. Lum.",
    strength: "80/480",
    dosage: 2,
    interval: "nocte",
    duration: "3/7",
    qty: 6,
  },
];

const aminaMedications: DispensedMedicationLine[] = [
  {
    name: "PCM",
    strength: "500MG",
    dosage: 2,
    interval: "t.d.s",
    duration: "3/7",
    qty: 18,
  },
  {
    name: "Dana Cough Syrup",
    strength: "100ml",
    dosage: 1,
    interval: "b.d",
    duration: "5/7",
    qty: 1,
  },
  {
    name: "Artemether/Lumefantrine",
    strength: "80/480",
    dosage: 2,
    interval: "b.d",
    duration: "3/7",
    qty: 6,
  },
];

const bayoMedications: DispensedMedicationLine[] = [
  {
    name: "PCM",
    strength: "500MG",
    dosage: 2,
    interval: "t.d.s",
    duration: "3/7",
    qty: 12,
  },
  {
    name: "Ciprofloxacin",
    strength: "500MG",
    dosage: 1,
    interval: "b.d",
    duration: "7/7",
    qty: 14,
  },
  {
    name: "ORS",
    strength: "",
    dosage: 1,
    interval: "stat",
    duration: "1/7",
    qty: 3,
  },
  {
    name: "Zinc Sulphate",
    strength: "20MG",
    dosage: 1,
    interval: "o.d",
    duration: "7/7",
    qty: 7,
  },
];

type VisitTemplate = Omit<DispensedVisitRecord, "dateTime" | "date">;

const visitTemplates: VisitTemplate[] = [
  {
    id: "visit-1",
    name: "Ayo Bola",
    patientId: "PVT-01",
    patientType: "PRIVATE",
    gender: "Male",
    age: 32,
    complaints: "fell from bike",
    diagnosis: "arm fracture",
    staffName: "Sample Tester",
    clinicianName: "Dr EasyCare Tester",
    medications: ayoMedications,
  },
  {
    id: "visit-2",
    name: "Amina",
    patientId: "LDWAY/01",
    patientType: "HMO",
    gender: "Female",
    age: 22,
    complaints: "headache",
    diagnosis: "malaria",
    staffName: "Sample Tester",
    clinicianName: "Dr EasyCare Tester",
    medications: aminaMedications,
  },
  {
    id: "visit-3",
    name: "Bayo",
    patientId: "NHIS/09",
    patientType: "NHIS",
    gender: "Male",
    age: 11,
    complaints: "fever",
    diagnosis: "typhoid",
    staffName: "Sample Tester",
    clinicianName: "Dr EasyCare Tester",
    medications: bayoMedications,
  },
];

function withVisitDate(template: VisitTemplate, index: number): DispensedVisitRecord {
  const date = dateAtDaysAgo(index, 12, 0);
  return {
    ...template,
    date,
    dateTime: formatLogDateTime(date),
  };
}

export function formatDispensedDate(date: Date): string {
  return formatLogDate(date);
}

export function formatDispensedTime(date: Date): string {
  return formatLogTime(date);
}

export function buildMockDispensedVisitRecords(): DispensedVisitRecord[] {
  return visitTemplates.map(withVisitDate);
}

export function buildMockDispensedMedicationRows(): DispensedMedicationRow[] {
  return buildMockDispensedVisitRecords().flatMap((visit) =>
    visit.medications.map((med, index) => ({
      ...visit,
      rowId: `${visit.id}-${index}`,
      medicationName: med.strength
        ? `${med.name} ${med.strength}`
        : med.name,
      qtyGiven: med.qty,
    })),
  );
}

export function parseDispensedDate(dateTime: string): Date {
  const [datePart, timePart] = dateTime.split(" ");
  if (!timePart) {
    const slashParts = datePart.split("/").map(Number);
    if (slashParts.length === 3) {
      const [day, month, year] = slashParts;
      return new Date(year, month - 1, day);
    }
  }

  const dashParts = datePart.split("-");
  if (dashParts.length === 3) {
    const months: Record<string, number> = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    const day = Number.parseInt(dashParts[0], 10);
    const month = months[dashParts[1]];
    const year = Number.parseInt(dashParts[2], 10);
    if (month !== undefined && !Number.isNaN(day) && !Number.isNaN(year)) {
      const date = new Date(year, month, day);
      if (timePart) {
        const match = timePart.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
        if (match) {
          let hours = Number.parseInt(match[1], 10);
          const minutes = Number.parseInt(match[2], 10);
          const meridiem = match[3].toUpperCase();
          if (meridiem === "PM" && hours < 12) hours += 12;
          if (meridiem === "AM" && hours === 12) hours = 0;
          date.setHours(hours, minutes, 0, 0);
        }
      }
      return date;
    }
  }

  const [day, month, year] = datePart.split("/").map(Number);
  return new Date(year, month - 1, day);
}
