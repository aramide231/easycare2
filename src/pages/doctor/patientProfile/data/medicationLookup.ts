import medicationSampleListCsv from "./medicationSampleList.csv?raw";

export type MedicationLookupOption = {
  id: string;
  name: string;
  form: string;
  strength: string;
  sellingPrice: number;
};

export type IntervalOption = {
  value: string;
  label: string;
  multiplier: number;
};

export const DOSAGE_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export const INTERVAL_OPTIONS: IntervalOption[] = [
  { value: "stat", label: "STAT (Immediately)", multiplier: 1 },
  { value: "once", label: "ONCE (Single dose)", multiplier: 1 },
  { value: "od", label: "OD/QD (Once daily)", multiplier: 1 },
  { value: "bid", label: "BID (Twice daily)", multiplier: 2 },
  { value: "tds", label: "TDS (Three times daily)", multiplier: 3 },
  { value: "qid", label: "QID (Four times daily)", multiplier: 4 },
  { value: "prn", label: "PRN (As needed)", multiplier: 1 },
  { value: "hs", label: "HS (At bedtime)", multiplier: 1 },
  { value: "ac", label: "AC (Before meals)", multiplier: 3 },
  { value: "pc", label: "PC (After meals)", multiplier: 3 },
  { value: "2hrly", label: "2Hrly (Every 2 hours)", multiplier: 12 },
  { value: "3hrly", label: "3Hrly (Every 3 hours)", multiplier: 8 },
  { value: "4hrly", label: "4Hrly (Every 4 hours)", multiplier: 6 },
  { value: "6hrly", label: "6Hrly (Every 6 hours)", multiplier: 4 },
  { value: "8hrly", label: "8Hrly (Every 8 hours)", multiplier: 3 },
  { value: "12hrly", label: "12Hrly (Every 12 hours)", multiplier: 2 },
  { value: "24hrly", label: "24Hrly (Every 24 hours)", multiplier: 1 },
  { value: "48hrly", label: "48Hrly (Every 48 hours)", multiplier: 0.5 },
  { value: "72hrly", label: "72Hrly (Every 72 hours)", multiplier: 1 / 3 },
  { value: "wlky", label: "Wlky (Weekly)", multiplier: 1 / 7 },
  { value: "biw", label: "BIW (Twice weekly)", multiplier: 2 / 7 },
  { value: "tiw", label: "TIW (Three times weekly)", multiplier: 3 / 7 },
  { value: "2wlky", label: "2Wlky (Every 2 weeks)", multiplier: 1 / 14 },
  { value: "q1m", label: "Q1M (Monthly)", multiplier: 1 / 30 },
  { value: "q3m", label: "Q3M (Every 3 months)", multiplier: 1 / 90 },
  { value: "q6m", label: "Q6M (Every 6 months)", multiplier: 1 / 180 },
  { value: "q1yrly", label: "Q1Yrly (Yearly)", multiplier: 1 / 365 },
];

export type PeriodOption = {
  value: string;
  label: string;
  /** Day count used for Qty = Dosage × Interval × Period. */
  days: number;
};

export const PERIOD_OPTIONS: PeriodOption[] = [
  { value: "1-7", label: "1/7", days: 1 },
  { value: "2-7", label: "2/7", days: 2 },
  { value: "3-7", label: "3/7", days: 3 },
  { value: "4-7", label: "4/7", days: 4 },
  { value: "5-7", label: "5/7", days: 5 },
  { value: "6-7", label: "6/7", days: 6 },
  { value: "7-7", label: "7/7", days: 7 },
  { value: "8-14", label: "8/14", days: 8 },
  { value: "9-14", label: "9/14", days: 9 },
  { value: "10-14", label: "10/14", days: 10 },
  { value: "11-14", label: "11/14", days: 11 },
  { value: "12-14", label: "12/14", days: 12 },
  { value: "13-14", label: "13/14", days: 13 },
  { value: "14-14", label: "14/14", days: 14 },
  { value: "1-52", label: "1/52", days: 7 },
  { value: "2-52", label: "2/52", days: 14 },
  { value: "3-52", label: "3/52", days: 21 },
  { value: "4-52", label: "4/52", days: 28 },
  { value: "6-52", label: "6/52", days: 42 },
  { value: "1-12", label: "1/12", days: 30 },
  { value: "2-12", label: "2/12", days: 60 },
  { value: "3-12", label: "3/12", days: 90 },
];

function slugifyMedicationId(name: string, index: number): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || `medication-${index + 1}`;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const MEDICATION_FORM_KEYWORDS = [
  "Dry Powder Inhaler (DPI)",
  "Metered Dose Inhaler (MDI)",
  "Powder for oral suspension",
  "Powder for Injection",
  "Oral Powder",
  "Eye ointment",
  "Eye Drops",
  "Ear Drops",
  "Nasal drops",
  "Nasal Spray",
  "Nebulizer Solution",
  "Vaginal Cream",
  "Vaginal Tablet",
  "Dusting Powder",
  "Aerosol spray",
  "Transdermal Patch",
  "Dispersible Tabet",
  "Dispersible Tablet",
  "Effervescent tablets",
  "Effervescent Tablet",
  "Sublingual Tablet",
  "Chewable Tablet",
  "Buccal Tablet",
  "Tablet/Capsules",
  "Tab/Capsules",
  "Tab/Caps",
  "Tablets",
  "Tablet",
  "Capsules",
  "Capsule",
  "Suppository",
  "Suppossitory",
  "Pesssary",
  "Pessary",
  "Prefilled Syringe",
  "Injection",
  "Suspension",
  "Ampoules",
  "Syrup",
  "Solution",
  "Cream",
  "Ointment",
  "Lotion",
  "Granules",
  "Granule",
  "Powder",
  "Liquid",
  "Mixture",
  "Foam",
  "Spray",
  "Drops",
  "Vial",
  "Amp",
  "Inj",
  "Tube",
  "Tin",
  "UP",
  "Roll",
  "Strip",
  "Sachet",
  "Kit",
  "Unit",
  "Patch",
  "Implant",
  "Infusion",
  "Elixir",
  "Enema",
  "Paste",
  "Water",
  "Vaccine",
  "Gels",
  "Mouthwash",
  "Mouth Paint",
].sort((a, b) => b.length - a.length);

/** IF-condition forms — matched before generic keywords (e.g. Syrup before Suspension). */
const SYRUP_CREAM_FORM_KEYWORDS = ["Vaginal Cream", "Syrup", "Cream"] as const;

const STRENGTH_TOKEN_REGEX =
  /\d+(?:\.\d+)?\s*(?:mg|mcg|g|ml|l|mu|units?|iu|i\.u\.)(?:\/\d+\s*ml)?|\d+(?:\.\d+)?\s*%/gi;

function normalizeCatalogForm(form: string): string {
  const value = form.trim();
  if (!value) return "";
  if (/^tab(?:let)?s?$/i.test(value)) return "Tablets";
  if (/^tab\/caps$/i.test(value)) return "Tab/Caps";
  if (/^capsule|capsules$/i.test(value)) return "Capsule";
  if (/^inj|injection$/i.test(value)) return "Injection";
  if (/^up$/i.test(value)) return "UP";
  if (/^amp|ampoules$/i.test(value)) return "Ampoules";
  if (/^susp|suspension$/i.test(value)) return "Suspension";
  if (/^sol|solution$/i.test(value)) return "Solution";
  if (/^syrup$/i.test(value)) return "Syrup";
  if (/^cream$/i.test(value)) return "Cream";
  if (/^ointment|eye ointment$/i.test(value)) return "Ointment";
  if (/^lotion$/i.test(value)) return "Lotion";
  if (/^drops|eye drops|ear drops|nasal drops$/i.test(value)) return "Drops";
  if (/^powder|granule|granules$/i.test(value)) return "Powder";
  if (/^supp|suppository|suppossitory$/i.test(value)) return "Suppository";
  if (/^vial$/i.test(value)) return "Vial";
  if (/^tube$/i.test(value)) return "Tube";
  return value;
}

function splitMedicationDescription(description: string): {
  name: string;
  form: string;
  strength: string;
} {
  const full = description.trim();
  let matchedForm = "";

  for (const keyword of SYRUP_CREAM_FORM_KEYWORDS) {
    const regex = new RegExp(`\\b${escapeRegExp(keyword)}\\b`, "i");
    const match = full.match(regex);
    if (match) {
      matchedForm = match[0];
      break;
    }
  }

  if (!matchedForm) {
    for (const keyword of MEDICATION_FORM_KEYWORDS) {
      const regex = new RegExp(`\\b${escapeRegExp(keyword)}\\b`, "i");
      const match = full.match(regex);
      if (match) {
        matchedForm = match[0];
        break;
      }
    }
  }

  const strengthTokens = [...full.matchAll(STRENGTH_TOKEN_REGEX)].map((match) =>
    match[0].trim()
  );
  const strength = strengthTokens.join(" + ");

  let name = full;
  if (matchedForm) {
    name = name.replace(
      new RegExp(`\\b${escapeRegExp(matchedForm)}\\b`, "i"),
      " "
    );
  }
  for (const token of strengthTokens) {
    name = name.replace(token, " ");
  }
  name = name
    .replace(/\([^)]*\)/g, " ")
    .replace(/\s+/g, " ")
    .replace(/[,\-]+$/g, "")
    .trim();

  if (!name) {
    name = full;
  }

  return {
    name,
    form: normalizeCatalogForm(matchedForm),
    strength,
  };
}

function parseLegacyMedicationRow(
  parts: string[],
  index: number
): MedicationLookupOption | null {
  const name = parts[0]?.trim() ?? "";
  const form = parts[1]?.trim() ?? "";
  const strength = parts[2]?.trim() ?? "";
  const priceText = parts[3]?.replace(/["']/g, "").replace(/,/g, "").trim();
  const sellingPrice = Number(priceText);

  if (!name || !form || !strength || !Number.isFinite(sellingPrice)) {
    return null;
  }

  return {
    id: slugifyMedicationId(name, index),
    name,
    form,
    strength,
    sellingPrice,
  };
}

function parseCatalogMedicationRow(
  line: string,
  index: number
): MedicationLookupOption | null {
  const parts = line.split(",");
  const description = parts[0]?.trim() ?? "";
  const priceText = parts[1]?.replace(/["']/g, "").replace(/,/g, "").trim() ?? "";
  const sellingPrice = priceText ? Number(priceText) : NaN;

  if (!description || !Number.isFinite(sellingPrice) || sellingPrice <= 0) {
    return null;
  }

  const { form, strength } = splitMedicationDescription(description);

  return {
    id: slugifyMedicationId(description, index),
    name: description,
    form,
    strength: strength || description,
    sellingPrice,
  };
}

function parseMedicationCsv(raw: string): MedicationLookupOption[] {
  const seen = new Set<string>();

  return raw
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const parts = line.split(",");
      if (parts.length >= 4 && parts[1]?.trim() && parts[2]?.trim()) {
        return parseLegacyMedicationRow(parts, index);
      }
      return parseCatalogMedicationRow(line, index);
    })
    .filter((row): row is MedicationLookupOption => {
      if (!row) return false;
      if (seen.has(row.id)) return false;
      seen.add(row.id);
      return true;
    });
}

export const MEDICATION_LOOKUP: MedicationLookupOption[] =
  parseMedicationCsv(medicationSampleListCsv);

export function formatMedicationNaira(amount: number): string {
  return `₦ ${amount.toLocaleString()}.00`;
}

export const MULTI_QUANTITY_FORMS = [
  "Buccal Tablet",
  "Capsule",
  "Chewable Tablet",
  "Dispersible Tablet",
  "Effervescent Tablet",
  "Vaginal Tablet",
  "Lozenge",
  "Sublingual Tablet",
  "Tab/Caps",
  "Tablets",
  "UP",
  "Vaccine",
  "Water",
] as const;

/** Forms that are typically dispensed as a single unit — Qty auto-calculates to 1. */
export const UNIT_QUANTITY_FORMS = [
  "Active Kit",
  "Ampoules",
  "Bottle",
  "Cream",
  "Dry Powder Inhaler (DPI)",
  "Ear Drops",
  "Elixir",
  "Enema",
  "Eye Drops",
  "Eye Ointment",
  "Foam",
  "Gels",
  "Granules",
  "Implant",
  "Infusion",
  "Lotion",
  "Metered Dose Inhaler (MDI)",
  "Mouth Paint",
  "Mouthwash",
  "Nasal Drops",
  "Nasal Spray",
  "Nebulizer Solution",
  "Ointment",
  "Oral Drops",
  "Oral Powder",
  "Paste",
  "Pessary",
  "Powder for Injection",
  "Prefilled Syringe",
  "Solution",
  "Spray",
  "Strip",
  "Suppository",
  "Suspension",
  "Syrup",
  "Transdermal Patch",
  "Vaginal Cream",
] as const;

function normalizeFormKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

const UNIT_QUANTITY_FORM_KEYS = new Set(
  UNIT_QUANTITY_FORMS.map((form) => normalizeFormKey(form))
);

/** CSV / catalogue aliases mapped to unit-quantity forms. */
const UNIT_QUANTITY_FORM_ALIASES: Record<string, string> = {
  amp: "ampoules",
  ampoule: "ampoules",
  bottle: "bottle",
  cream: "cream",
  dpi: "dry powder inhaler (dpi)",
  lotion: "lotion",
  mdi: "metered dose inhaler (mdi)",
  ointment: "ointment",
  solution: "solution",
  susp: "suspension",
  suspension: "suspension",
  syrup: "syrup",
  patch: "transdermal patch",
};

function normalizedFormMatchesUnitQuantity(form: string): boolean {
  const normalizedForm = normalizeFormKey(form);
  if (!normalizedForm) return false;
  if (UNIT_QUANTITY_FORM_KEYS.has(normalizedForm)) return true;
  const alias = UNIT_QUANTITY_FORM_ALIASES[normalizedForm];
  return Boolean(alias && UNIT_QUANTITY_FORM_KEYS.has(alias));
}

function medicationNameMatchesUnitQuantityForm(medicationName: string): boolean {
  const name = medicationName.trim().toLowerCase();
  if (!name) return false;

  const sortedForms = [...UNIT_QUANTITY_FORMS].sort(
    (a, b) => b.length - a.length
  );

  for (const unitForm of sortedForms) {
    const key = normalizeFormKey(unitForm);
    const pattern = new RegExp(`\\b${escapeRegExp(key)}\\b`, "i");
    if (pattern.test(name)) return true;
  }

  return false;
}

function isTabletOrCapsuleProduct(form: string, medicationName: string): boolean {
  const normalizedForm = normalizeFormKey(form);
  if (
    normalizedForm === "tablets" ||
    normalizedForm === "tablet" ||
    normalizedForm === "capsule" ||
    normalizedForm === "capsules" ||
    normalizedForm === "tab/caps"
  ) {
    return true;
  }

  const name = medicationName.trim().toLowerCase();
  return /\btablets?\b|\bcapsules?\b|\btab\/caps\b/.test(name);
}

/** Syrup/Cream IF: dispensed quantity is always 1 (one bottle/tube). */
function isSyrupOrCreamProduct(form: string, medicationName: string): boolean {
  if (isTabletOrCapsuleProduct(form, medicationName)) return false;

  const normalizedForm = normalizeFormKey(form);
  if (normalizedForm.includes("syrup") || normalizedForm.includes("cream")) {
    return true;
  }

  const name = medicationName.trim().toLowerCase();
  if (/\bsyrup\b|\bcream\b/.test(name)) return true;

  // e.g. "Syrup/suspension" when form parses as Suspension only
  return normalizedForm === "suspension" && /\bsyrup\b/.test(name);
}

/** True when drug form limits dispensed Qty to 1 (unit-quantity forms list). */
export function isUnitQuantityForm(
  form: string,
  medicationName = ""
): boolean {
  if (isTabletOrCapsuleProduct(form, medicationName)) return false;
  if (normalizedFormMatchesUnitQuantity(form)) return true;
  if (medicationNameMatchesUnitQuantityForm(medicationName)) return true;
  return isSyrupOrCreamProduct(form, medicationName);
}

/** Liquid drugs (IV fluids/injectables) whose Qty the clinician can edit manually. */
export const EDITABLE_QUANTITY_FORMS = [
  "Injection",
  "Infusion",
  "Solution",
  "IVF",
] as const;

const EDITABLE_QUANTITY_FORM_KEYS = new Set(
  EDITABLE_QUANTITY_FORMS.map((form) => normalizeFormKey(form))
);

const EDITABLE_QUANTITY_NAME_KEYWORDS = [
  "normal saline",
  "sodium chloride",
  "dextrose",
  "saline",
  "water for injection",
];

/** True when the drug is a liquid (normal saline, injection, dextrose water, etc.) with a manually editable Qty. */
export function isEditableQuantityForm(
  form: string,
  medicationName = ""
): boolean {
  const normalizedForm = normalizeFormKey(form);
  if (EDITABLE_QUANTITY_FORM_KEYS.has(normalizedForm)) return true;
  const name = medicationName.trim().toLowerCase();
  return EDITABLE_QUANTITY_NAME_KEYWORDS.some((keyword) =>
    name.includes(keyword)
  );
}

export function resolveIntervalMultiplier(intervalValue: string): number {
  return (
    INTERVAL_OPTIONS.find((option) => option.value === intervalValue)
      ?.multiplier ?? 0
  );
}

export function getIntervalLabel(intervalValue: string): string {
  return (
    INTERVAL_OPTIONS.find((option) => option.value === intervalValue)?.label ??
    intervalValue
  );
}

export function resolvePeriodDays(periodValue: string): number {
  return PERIOD_OPTIONS.find((option) => option.value === periodValue)?.days ?? 0;
}

export function getPeriodLabel(periodValue: string): string {
  return (
    PERIOD_OPTIONS.find((option) => option.value === periodValue)?.label ??
    periodValue
  );
}

/** Leading number from free-text dosage (e.g. "2.3mls" → 2.3). */
export function parseDosageNumericValue(dosage: string): number {
  const match = dosage.trim().match(/^(\d+(?:\.\d+)?)/);
  if (!match) return 0;
  const value = Number(match[1]);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

/** Regimen dose count — Dosage × Interval × Period (no Syrup/Cream cap). */
export function calculateRegimenQuantity(
  dosage: string,
  intervalValue: string,
  periodValue: string
): number {
  const dosageNum = parseDosageNumericValue(dosage);
  const periodNum = resolvePeriodDays(periodValue);
  const intervalMultiplier = resolveIntervalMultiplier(intervalValue);

  if (!dosageNum || !periodNum || !intervalMultiplier) return 0;

  if (intervalValue === "once" || intervalValue === "stat") {
    return dosageNum;
  }

  const rawQuantity = dosageNum * intervalMultiplier * periodNum;
  return Math.max(1, Math.ceil(rawQuantity));
}

/** Qty = Dosage × Interval × Period. Syrup/Cream dispense qty → 1. */
export function calculateMedicationQuantity(
  dosage: string,
  intervalValue: string,
  periodValue: string,
  drugForm: string,
  medicationName = ""
): number {
  if (isUnitQuantityForm(drugForm, medicationName)) return 1;

  return calculateRegimenQuantity(dosage, intervalValue, periodValue);
}

/** Amount = Selling Price × Quantity (Qty respects Syrup/Cream IF → 1). */
export function calculateMedicationLineAmount(
  sellingPrice: number,
  dosage: string,
  intervalValue: string,
  periodValue: string,
  drugForm: string,
  medicationName = ""
): number {
  const quantity = calculateMedicationQuantity(
    dosage,
    intervalValue,
    periodValue,
    drugForm,
    medicationName
  );
  return calculateMedicationAmount(sellingPrice, quantity);
}

/** Amount = Selling Price × Quantity. */
export function calculateMedicationAmount(
  sellingPrice: number,
  quantity: number
): number {
  if (!Number.isFinite(sellingPrice) || sellingPrice <= 0 || quantity <= 0) {
    return 0;
  }
  return sellingPrice * quantity;
}

export function formatMedicationDisplayName(
  name: string,
  strength: string
): string {
  const trimmedName = name.trim();
  const trimmedStrength = strength.trim();
  if (!trimmedName) return trimmedStrength;
  if (!trimmedStrength || trimmedStrength === "-") return trimmedName;
  if (trimmedName.toLowerCase().includes(trimmedStrength.toLowerCase())) {
    return trimmedName;
  }
  return `${trimmedName} ${trimmedStrength}`;
}
