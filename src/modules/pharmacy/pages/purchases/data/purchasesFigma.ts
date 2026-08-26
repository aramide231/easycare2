export type SupplierRow = {
  id: number;
  date: string;
  time: string;
  supplierName: string;
  orgName: string;
  officeAddress: string;
  phoneCountryIso: string;
  phoneCountryCode: string;
  phoneNumber: string;
  invoiceNumber: string;
};

export type SupplierFormValues = {
  supplierName: string;
  title: string;
  orgName: string;
  phoneCountryIso: string;
  phoneCountryCode: string;
  phoneNumber: string;
  alternatePhoneCountryIso: string;
  alternatePhoneCountryCode: string;
  alternatePhoneNumber: string;
  invoiceNumber: string;
  email: string;
  officeAddress: string;
};

export const SUPPLIER_TITLES = ["Mr", "Mrs", "Miss", "Dr", "Chief"] as const;

/** Suppliers Details — Figma frame (6 rows). */
export const SUPPLIERS_DETAILS_ROWS: SupplierRow[] = [
  {
    id: 1,
    date: "12-Mar-2025",
    time: "11:15 AM",
    supplierName: "Alade Abiodun",
    orgName: "AIICO PLC",
    officeAddress: "322, Ikorodu Rd",
    phoneCountryIso: "ng",
    phoneCountryCode: "+234",
    phoneNumber: "07026744353",
    invoiceNumber: "27389201",
  },
  {
    id: 2,
    date: "12-Mar-2025",
    time: "11:15 AM",
    supplierName: "Alade Abiodun",
    orgName: "BASTON LTD",
    officeAddress: "35, Ikeja Rd",
    phoneCountryIso: "ng",
    phoneCountryCode: "+234",
    phoneNumber: "09026334381",
    invoiceNumber: "27389201",
  },
  {
    id: 3,
    date: "12-Mar-2025",
    time: "11:15 AM",
    supplierName: "Alade Abiodun",
    orgName: "CAPITOL PLC",
    officeAddress: "41, Badore Str",
    phoneCountryIso: "ng",
    phoneCountryCode: "+234",
    phoneNumber: "08034567890",
    invoiceNumber: "27389201",
  },
  {
    id: 4,
    date: "12-Mar-2025",
    time: "11:15 AM",
    supplierName: "Alade Abiodun",
    orgName: "ENEME LTD",
    officeAddress: "35, Abiola Way",
    phoneCountryIso: "ng",
    phoneCountryCode: "+234",
    phoneNumber: "07045678901",
    invoiceNumber: "27389201",
  },
  {
    id: 5,
    date: "12-Mar-2025",
    time: "11:15 AM",
    supplierName: "Alade Abiodun",
    orgName: "METRO HEALTH",
    officeAddress: "2, Matthew Crescent",
    phoneCountryIso: "ng",
    phoneCountryCode: "+234",
    phoneNumber: "08056789012",
    invoiceNumber: "27389201",
  },
  {
    id: 6,
    date: "12-Mar-2025",
    time: "11:15 AM",
    supplierName: "Alade Abiodun",
    orgName: "NOVO LTD",
    officeAddress: "45, Mushin Lagos",
    phoneCountryIso: "ng",
    phoneCountryCode: "+234",
    phoneNumber: "09067890123",
    invoiceNumber: "27389201",
  },
];
