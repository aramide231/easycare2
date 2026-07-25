export const TREATMENT_CATEGORY_LABELS: Record<string, string> = {
  "Gen Consult": "General Consultation",
  "Ante Natal Care": "Ante Natal Care",
  "Child Birth": "Child Birth",
  "Family Planning": "Family Planning",
  Immunization: "Immunization",
  "Neo Natal Care": "Neo Natal Care",
  "Post Natal Care": "Post Natal Care",
  "Specialist Consult": "Specialist Consultation",
  Surgical: "Surgical",
};

export type TreatmentFieldRow = { label: string; value: string };

export type TreatmentTableSection = {
  type: "table";
  columns: string[];
  rows: string[][];
  totalLabel?: string;
  totalValue?: string;
};

export type TreatmentTextSection = {
  type: "text";
  fields: TreatmentFieldRow[];
};

export type TreatmentSection = {
  title: string;
  content: TreatmentTextSection | TreatmentTableSection;
};

export type TreatmentReview = {
  categoryKey: string;
  categoryLabel: string;
  sections: TreatmentSection[];
};

function textSection(
  title: string,
  fields: TreatmentFieldRow[],
): TreatmentSection {
  return { title, content: { type: "text", fields } };
}

function tableSection(
  title: string,
  columns: string[],
  rows: string[][],
  totalLabel?: string,
  totalValue?: string,
): TreatmentSection {
  return {
    title,
    content: { type: "table", columns, rows, totalLabel, totalValue },
  };
}

const GEN_CONSULT_REVIEW: TreatmentReview = {
  categoryKey: "Gen Consult",
  categoryLabel: "General Consultation",
  sections: [
    textSection("VITAL SIGNS", [
      { label: "Temperature (°C)", value: "36" },
      { label: "Blood Pressure (mmHg)", value: "120/80" },
      { label: "Weight (kg)", value: "75" },
      { label: "Height (cm)", value: "165" },
      { label: "Blood Sugar", value: "98" },
      { label: "Pulse Rate", value: "90" },
      { label: "Respiration (bpm)", value: "20" },
      { label: "Body Mass Index (BMI)", value: "22.0" },
      { label: "MUAC", value: "30" },
      { label: "Peripheral Oxygen Saturation (SpO2)", value: "94.0" },
      { label: "Fetal Heart Rate", value: "30" },
      { label: "Comments", value: "Normal Stage" },
    ]),
    textSection("PRESENTING COMPLAINTS", [
      { label: "Complaints / History", value: "Normal blood pressure, Big Body" },
    ]),
    textSection("PHYSICAL EXAMINATION", [
      { label: "General", value: "Text here" },
      { label: "GIT", value: "Text here" },
      { label: "CNS", value: "Text here" },
      { label: "RS", value: "Text here" },
      { label: "Chest", value: "Text here" },
      { label: "MSS", value: "Text here" },
      { label: "CVS", value: "Text here" },
      { label: "ENT", value: "Text here" },
      { label: "Abdomen", value: "Text here" },
      { label: "Comments", value: "Normal Blood Press..." },
    ]),
    textSection("DIAGNOSIS", [
      { label: "Diagnosis", value: "Malaria NO Sepsis" },
    ]),
    tableSection(
      "INVESTIGATION",
      ["Investigation", "Price (₦)"],
      [
        ["Genotype", "3,000.00"],
        ["Malaria Parasite", "3,000.00"],
        ["HVS", "4,000.00"],
      ],
      "TOTAL",
      "10,000.00",
    ),
    textSection("MEDICATION", [
      { label: "Medication", value: "Vitamin A" },
      { label: "Dosage", value: "3" },
      { label: "Drug Form", value: "TABLET" },
      { label: "Quantity", value: "3" },
      { label: "Drug Unit", value: "2" },
      { label: "Refill", value: "1" },
      { label: "Duration", value: "1/2" },
      { label: "Price", value: "₦3,000.00" },
    ]),
    tableSection(
      "PROCEDURE",
      ["Procedure", "Price (₦)"],
      [
        ["Bed Pan Removal", "3,000.00"],
        ["Wound Dressing", "3,000.00"],
        ["Suturing", "4,000.00"],
      ],
      "TOTAL",
      "10,000.00",
    ),
    textSection("REPORT WRITING", [
      {
        label: "Comments",
        value:
          "PATIENT REPORTED PERSISTENT HEADACHE FOR THE PAST THREE DAYS. VITALS STABLE. TREATMENT CONTINUES AS PLANNED.",
      },
    ]),
    textSection("IN-TAKE CHART", [
      { label: "Type of Fluid", value: "Text Here" },
      { label: "Bottle", value: "Text Here" },
      { label: "IV", value: "Text Here" },
      { label: "Oral", value: "Text Here" },
      { label: "Water/Tea", value: "Text Here" },
    ]),
    textSection("OUTPUT CHART", [
      { label: "Gastric Aspiration", value: "Text Here" },
      { label: "Vomit", value: "Text Here" },
      { label: "Urine", value: "Text Here" },
      { label: "Stool", value: "Text Here" },
      { label: "Skin", value: "Text Here" },
      { label: "Blood", value: "Text Here" },
      { label: "Output Total", value: "Text Here" },
      { label: "Fluid Balance", value: "Text Here" },
    ]),
    textSection("NURSING DISPENSES", [{ label: "Criteria", value: "NIL" }]),
    textSection("PHARMACY DISPENSE", [{ label: "Criteria", value: "NIL" }]),
  ],
};

const ANTE_NATAL_REVIEW: TreatmentReview = {
  categoryKey: "Ante Natal Care",
  categoryLabel: "Ante Natal Care",
  sections: [
    textSection("VITAL SIGNS", [
      { label: "Temperature (°C)", value: "36.5" },
      { label: "Blood Pressure (mmHg)", value: "118/76" },
      { label: "Weight (kg)", value: "68" },
      { label: "Height (cm)", value: "162" },
      { label: "Fetal Heart Rate", value: "142 bpm" },
      { label: "Comments", value: "Stable vitals" },
    ]),
    textSection("PREVIOUS MEDICAL HISTORY", [
      { label: "History", value: "No known chronic illness. Previous appendectomy (2019)." },
    ]),
    textSection("FAMILY MEDICAL HISTORY", [
      { label: "History", value: "Mother — hypertension. No family history of diabetes." },
    ]),
    textSection("NEW ANTENATAL BOOKING", [
      { label: "Gestational Age", value: "12 weeks" },
      { label: "EDD", value: "15-Nov-2025" },
      { label: "Gravida / Para", value: "G2 P1" },
      { label: "LMP", value: "20-Feb-2025" },
    ]),
    textSection("PREVIOUS PREGNANCY HISTORY", [
      {
        label: "Details",
        value: "One previous spontaneous vaginal delivery at term. No complications.",
      },
    ]),
    textSection("PRESENTING COMPLAINTS", [
      { label: "Complaints", value: "Mild nausea and fatigue. No bleeding or abdominal pain." },
    ]),
    textSection("PHYSICAL EXAMINATION", [
      { label: "General", value: "Well nourished, not in distress" },
      { label: "Abdomen", value: "Gravid uterus, fundal height appropriate for dates" },
      { label: "Comments", value: "No oedema. FHR audible." },
    ]),
    textSection("DIAGNOSIS", [
      { label: "Diagnosis", value: "Intrauterine pregnancy — 12 weeks" },
    ]),
    tableSection(
      "INVESTIGATION",
      ["Investigation", "Price (₦)"],
      [
        ["Packed Cell Volume", "2,500.00"],
        ["Urinalysis", "1,500.00"],
        ["Obstetric Scan", "8,000.00"],
      ],
      "TOTAL",
      "12,000.00",
    ),
    tableSection(
      "PROCEDURE",
      ["Procedure", "Price (₦)"],
      [["Antenatal Counselling", "2,000.00"]],
      "TOTAL",
      "2,000.00",
    ),
    textSection("MEDICATION", [
      { label: "Medication", value: "Folic Acid + Ferrous Sulphate" },
      { label: "Dosage", value: "1 tablet daily" },
      { label: "Duration", value: "Until delivery" },
      { label: "Price", value: "₦1,200.00" },
    ]),
    textSection("FOLLOW-UP VISIT", [
      { label: "Next Visit", value: "20-Mar-2025" },
      { label: "Instructions", value: "Return in 4 weeks or if any warning signs develop." },
    ]),
  ],
};

const CHILD_BIRTH_REVIEW: TreatmentReview = {
  categoryKey: "Child Birth",
  categoryLabel: "Child Birth",
  sections: [
    textSection("STAGE 1: LABOUR", [
      { label: "Cervical Dilatation", value: "10 cm" },
      { label: "Contractions", value: "Regular, 3 in 10 minutes" },
      { label: "Membrane Status", value: "Ruptured — clear liquor" },
      { label: "Duration", value: "6 hours" },
    ]),
    textSection("STAGE 2: PUSHING & BIRTHING", [
      { label: "Mode of Delivery", value: "Spontaneous vaginal delivery" },
      { label: "Baby Gender", value: "Female" },
      { label: "Birth Weight", value: "3.2 kg" },
      { label: "Apgar Score", value: "8 at 1 min / 9 at 5 min" },
    ]),
    textSection("STAGE 3: DELIVERY OF PLACENTA", [
      { label: "Placenta Delivery", value: "Complete — 12 minutes postpartum" },
      { label: "Estimated Blood Loss", value: "250 ml" },
      { label: "Complications", value: "None" },
    ]),
    textSection("STAGE 4: DELIVERY NOTE", [
      {
        label: "Summary",
        value:
          "Live female infant delivered spontaneously at term. Mother stable. Placenta complete. No perineal tear requiring suturing.",
      },
      { label: "Attendant (Doctor)", value: "Dr. Easy Test" },
      { label: "Attendant (Nurse)", value: "Nurse Chibuzor" },
    ]),
  ],
};

const FAMILY_PLANNING_REVIEW: TreatmentReview = {
  categoryKey: "Family Planning",
  categoryLabel: "Family Planning",
  sections: [
    textSection("VITAL SIGNS", [
      { label: "Blood Pressure (mmHg)", value: "115/72" },
      { label: "Weight (kg)", value: "62" },
      { label: "Pulse Rate", value: "78 bpm" },
    ]),
    textSection("METHOD COUNSELLING", [
      { label: "Method Selected", value: "Hormonal — Combined Oral Contraceptive" },
      { label: "Counselling Notes", value: "Client counselled on benefits, side effects, and adherence." },
    ]),
    textSection("MEDICATION / SUPPLY", [
      { label: "Supply Given", value: "Microgynon 30 — 1 cycle pack" },
      { label: "Quantity", value: "21 tablets" },
      { label: "Price", value: "₦2,500.00" },
    ]),
    textSection("FOLLOW-UP", [
      { label: "Next Review", value: "20-Apr-2025" },
      { label: "Instructions", value: "Return for refill or if side effects occur." },
    ]),
  ],
};

const IMMUNIZATION_REVIEW: TreatmentReview = {
  categoryKey: "Immunization",
  categoryLabel: "Immunization",
  sections: [
    textSection("VITAL SIGNS", [
      { label: "Temperature (°C)", value: "36.8" },
      { label: "Weight (kg)", value: "8.5" },
      { label: "Comments", value: "Fit for vaccination" },
    ]),
    textSection("VACCINE ADMINISTRATION", [
      { label: "Vaccine", value: "Pentavalent (DPT-HepB-Hib)" },
      { label: "Dose", value: "0.5 ml" },
      { label: "Route", value: "Intramuscular" },
      { label: "Site", value: "Left anterolateral thigh" },
      { label: "Batch No.", value: "PNV-2025-0412" },
    ]),
    textSection("MEDICATION", [
      { label: "Medication", value: "Paracetamol syrup" },
      { label: "Dosage", value: "2.5 ml every 6 hours if fever" },
      { label: "Duration", value: "24 hours" },
    ]),
    textSection("FOLLOW-UP", [
      { label: "Next Appointment", value: "04-Apr-2025" },
      { label: "Next Vaccine", value: "OPV / Pentavalent — 2nd dose" },
    ]),
    textSection("CLINICAL NOTES", [
      {
        label: "Notes",
        value: "Vaccine administered without immediate adverse reaction. Caregiver advised on mild fever management.",
      },
    ]),
  ],
};

const NEO_NATAL_REVIEW: TreatmentReview = {
  categoryKey: "Neo Natal Care",
  categoryLabel: "Neo Natal Care",
  sections: [
    textSection("VITAL SIGNS", [
      { label: "Temperature (°C)", value: "36.9" },
      { label: "Respiration (bpm)", value: "42" },
      { label: "Heart Rate (bpm)", value: "138" },
      { label: "Weight (kg)", value: "3.1" },
      { label: "SpO2", value: "97%" },
    ]),
    textSection("DIAGNOSIS", [
      { label: "Diagnosis", value: "Term neonate — routine neonatal observation" },
    ]),
    tableSection(
      "INVESTIGATION",
      ["Investigation", "Result"],
      [
        ["Neonatal Screening", "Pending"],
        ["Blood Group", "O Positive"],
      ],
    ),
    tableSection(
      "PROCEDURE",
      ["Procedure", "Notes"],
      [
        ["Vitamin K Injection", "Given at birth"],
        ["Hearing Screen", "Scheduled"],
      ],
    ),
    textSection("MEDICATION", [
      { label: "Medication", value: "None at present" },
      { label: "Notes", value: "Breastfeeding established. Continue exclusive breastfeeding." },
    ]),
  ],
};

const POST_NATAL_REVIEW: TreatmentReview = {
  categoryKey: "Post Natal Care",
  categoryLabel: "Post Natal Care",
  sections: [
    textSection("VITAL SIGNS", [
      { label: "Temperature (°C)", value: "36.7" },
      { label: "Blood Pressure (mmHg)", value: "112/70" },
      { label: "Pulse Rate", value: "82 bpm" },
      { label: "Comments", value: "Postpartum day 3 — stable" },
    ]),
    textSection("PRESENTING COMPLAINTS", [
      { label: "Complaints", value: "Mild perineal discomfort. No fever or excessive bleeding." },
    ]),
    textSection("PHYSICAL EXAMINATION", [
      { label: "Uterus", value: "Involuting normally" },
      { label: "Perineum", value: "Mild oedema, no infection" },
      { label: "Breasts", value: "Lactating, no mastitis" },
      { label: "Comments", value: "Lochia rubra — normal amount" },
    ]),
    tableSection(
      "INVESTIGATION",
      ["Investigation", "Result"],
      [["Haemoglobin", "11.2 g/dL"]],
    ),
    textSection("MEDICATION", [
      { label: "Medication", value: "Ferrous Sulphate + Analgesic PRN" },
      { label: "Dosage", value: "As prescribed" },
      { label: "Duration", value: "6 weeks postpartum" },
    ]),
  ],
};

const SPECIALIST_CONSULT_REVIEW: TreatmentReview = {
  categoryKey: "Specialist Consult",
  categoryLabel: "Specialist Consultation",
  sections: [
    textSection("PRESENTING COMPLAINTS", [
      { label: "Complaints", value: "Persistent lower molar pain for 2 weeks." },
      { label: "Complaint History", value: "Pain worsens with chewing. No facial swelling." },
    ]),
    textSection("PREVIOUS DENTAL HISTORY", [
      { label: "Last Dental Visit", value: "08-Jan-2024" },
      { label: "Previous Treatment", value: "Scaling and polishing" },
      { label: "Allergies", value: "None known" },
    ]),
    textSection("PREVIOUS DENTAL MEDICATION", [
      { label: "Medication", value: "Ibuprofen 400 mg" },
      { label: "Dosage", value: "Twice daily" },
      { label: "Duration", value: "5 days (self-medicated)" },
      { label: "Response", value: "Partial relief" },
    ]),
  ],
};

const SURGICAL_REVIEW: TreatmentReview = {
  categoryKey: "Surgical",
  categoryLabel: "Surgical",
  sections: [
    textSection("PRE-OPERATION NOTE", [
      { label: "Procedure", value: "Appendectomy — laparoscopic" },
      { label: "Diagnosis", value: "Acute appendicitis" },
      { label: "Surgeon", value: "Dr. Jane Doe" },
      { label: "Anaesthesia", value: "General anaesthesia" },
      { label: "Pre-op Notes", value: "Patient fasted. Consent obtained. Prophylactic antibiotics given." },
    ]),
    textSection("POST-OPERATION NOTE", [
      { label: "Findings", value: "Inflamed appendix removed intact. No perforation." },
      { label: "Estimated Blood Loss", value: "Minimal" },
      { label: "Complications", value: "None intraoperatively" },
      { label: "Post-op Condition", value: "Stable, transferred to recovery" },
    ]),
    textSection("POST-OPERATION ORDERS", [
      { label: "Treatment", value: "IV Ceftriaxone" },
      { label: "Dosage", value: "1 g daily" },
      { label: "Duration", value: "48 hours" },
      { label: "Analgesia", value: "IV Paracetamol PRN" },
      { label: "Diet", value: "Sips of water when awake, advance as tolerated" },
      { label: "Monitoring", value: "Vitals 4-hourly. Wound review day 1." },
    ]),
  ],
};

const TREATMENT_REVIEWS: Record<string, TreatmentReview> = {
  "Gen Consult": GEN_CONSULT_REVIEW,
  "Ante Natal Care": ANTE_NATAL_REVIEW,
  "Child Birth": CHILD_BIRTH_REVIEW,
  "Family Planning": FAMILY_PLANNING_REVIEW,
  Immunization: IMMUNIZATION_REVIEW,
  "Neo Natal Care": NEO_NATAL_REVIEW,
  "Post Natal Care": POST_NATAL_REVIEW,
  "Specialist Consult": SPECIALIST_CONSULT_REVIEW,
  Surgical: SURGICAL_REVIEW,
};

const TREATMENT_CATEGORY_KEYS = [
  "Gen Consult",
  "Ante Natal Care",
  "Child Birth",
  "Family Planning",
  "Immunization",
  "Neo Natal Care",
  "Post Natal Care",
  "Specialist Consult",
  "Surgical",
] as const;

export function getTreatmentCategoryForAdmission(id: number): string {
  return TREATMENT_CATEGORY_KEYS[id % TREATMENT_CATEGORY_KEYS.length];
}

export function getTreatmentReview(categoryKey: string): TreatmentReview {
  return (
    TREATMENT_REVIEWS[categoryKey] ?? {
      categoryKey,
      categoryLabel: TREATMENT_CATEGORY_LABELS[categoryKey] ?? categoryKey,
      sections: [
        textSection("TREATMENT SUMMARY", [
          {
            label: "Category",
            value: TREATMENT_CATEGORY_LABELS[categoryKey] ?? categoryKey,
          },
          {
            label: "Notes",
            value: "No treatment details available for this category yet.",
          },
        ]),
      ],
    }
  );
}

export function getTreatmentCategoryLabel(categoryKey: string): string {
  return TREATMENT_CATEGORY_LABELS[categoryKey] ?? categoryKey;
}
