/** Explain the existing ANC entry restrictions without treating missing age as zero. */
export function antenatalEntryRestriction(patient: { gender?: unknown; age?: unknown }): string | null {
  const gender = String(patient.gender ?? "").trim().toLowerCase();
  if (gender === "m" || gender === "male") {
    return "Antenatal entry is unavailable because this patient is registered as Male. Select the intended antenatal patient or have incorrect registration details corrected.";
  }
  const ageText = String(patient.age ?? "").trim();
  const age = ageText ? Number(ageText) : NaN;
  if ((gender === "f" || gender === "female") && Number.isFinite(age) && age < 10) {
    return "Antenatal entry is unavailable because this patient is registered as under 10 years old. Check the patient's registration details.";
  }
  return null;
}
