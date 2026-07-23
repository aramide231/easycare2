import { MOCK_HMO_LIST_TOTAL } from "@hmo/pages/shared/lib/pagination";

export type HmoType = "PRIVATE" | "STAFF" | "HMO" | "COMPANY";

export type HmoRegistrationRecord = {
  id: string;
  name: string;
  code: string;
  hmoType: HmoType;
  preAuthCode: "YES" | "NO";
  officeAddress: string;
  phoneNumber: string;
  contactPerson: string;
  email: string;
};

const SEED: HmoRegistrationRecord[] = [
  {
    id: "hmo-1",
    name: "AIICO PLC",
    code: "AIICO",
    hmoType: "PRIVATE",
    preAuthCode: "YES",
    officeAddress: "322, Ikorodu Rd",
    phoneNumber: "07026744353",
    contactPerson: "Yemi Olutade",
    email: "info@aiicoplc.com",
  },
  {
    id: "hmo-2",
    name: "BASTON LTD",
    code: "BAST",
    hmoType: "STAFF",
    preAuthCode: "YES",
    officeAddress: "35, Ikeja Rd",
    phoneNumber: "09026334381",
    contactPerson: "Bola Demilade",
    email: "info@baston.com",
  },
  {
    id: "hmo-3",
    name: "CAPITOL PLC",
    code: "CAP",
    hmoType: "HMO",
    preAuthCode: "NO",
    officeAddress: "41, Badore Str",
    phoneNumber: "07026744353",
    contactPerson: "Yemi Olutade",
    email: "info@aiicoplc.com",
  },
  {
    id: "hmo-4",
    name: "ENEME LTD",
    code: "ENEME",
    hmoType: "COMPANY",
    preAuthCode: "NO",
    officeAddress: "35, Abiola Way",
    phoneNumber: "09026334381",
    contactPerson: "Bola Demilade",
    email: "info@eneme.co.uk",
  },
  {
    id: "hmo-5",
    name: "METRO HEALTH",
    code: "MTH",
    hmoType: "PRIVATE",
    preAuthCode: "NO",
    officeAddress: "2, Matthew Crescent",
    phoneNumber: "09026334381",
    contactPerson: "Yemi Olutade",
    email: "info@metrohlth.org",
  },
  {
    id: "hmo-6",
    name: "NOVO LTD",
    code: "NOVO",
    hmoType: "COMPANY",
    preAuthCode: "YES",
    officeAddress: "45, Mushin Lagos",
    phoneNumber: "07026744353",
    contactPerson: "Bola Demilade",
    email: "info@eneme.co.uk",
  },
];

const EXTRA_NAMES = [
  "LEADWAY HMO",
  "AXA MANSARD",
  "HYGEIA HMO",
  "RELIANCE HMO",
  "TOTAL HEALTH",
];

export function buildMockHmoRegistrationRecords(): HmoRegistrationRecord[] {
  const records: HmoRegistrationRecord[] = [...SEED];

  for (let i = SEED.length; i < MOCK_HMO_LIST_TOTAL; i += 1) {
    const base = SEED[i % SEED.length];
    const suffix = EXTRA_NAMES[i % EXTRA_NAMES.length];
    records.push({
      ...base,
      id: `hmo-${i + 1}`,
      name: `${suffix} ${i + 1}`,
      code: `${base.code}${i + 1}`,
      email: `contact${i + 1}@hmo.example.com`,
    });
  }

  return records;
}

export const HMO_ORGANISATION_OPTIONS = [
  "Leadway Health",
  "AIICO Multishield",
  "AXA Mansard Health",
  "Hygeia HMO",
  "Reliance HMO",
  "Total Health Trust",
];

export const PRE_AUTH_OPTIONS = ["YES", "NO"] as const;
