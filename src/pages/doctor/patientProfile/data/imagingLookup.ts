import type { InvestigationLookupOption } from "./investigationLookup";

function build(items: [string, number][]): InvestigationLookupOption[] {
  return items.map(([name, amount]) => ({
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    name,
    amount,
  }));
}

/** Placeholder Medical Imaging (scan) catalogue until the tariff / price list is finalised. */
export const MEDICAL_IMAGING_LOOKUP: InvestigationLookupOption[] = build([
  ["Obstetric Ultrasound Scan", 8000],
  ["Abdominal Ultrasound Scan", 10000],
  ["Pelvic Ultrasound Scan", 9000],
  ["Transvaginal Ultrasound Scan", 12000],
  ["Breast Ultrasound Scan", 10000],
  ["Echocardiography", 25000],
  ["CT Scan - Head", 60000],
  ["MRI - Brain", 120000],
]);

/** Placeholder X-Ray (Radiography) catalogue until the tariff / price list is finalised. */
export const XRAY_LOOKUP: InvestigationLookupOption[] = build([
  ["Chest X-Ray (PA)", 7000],
  ["Abdominal X-Ray", 8000],
  ["Pelvic X-Ray", 8000],
  ["Skull X-Ray", 9000],
  ["Spine X-Ray (Lumbar)", 10000],
  ["Hand / Wrist X-Ray", 6000],
  ["Knee X-Ray", 7000],
  ["Foot / Ankle X-Ray", 6500],
]);