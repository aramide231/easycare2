import { isBloodGlucoseInvestigation } from "./bloodGlucose";
import { isElectrolytesUreaInvestigation } from "./electrolytesUrea";
import { isHaematologyInvestigation } from "./haematologyCbc";
import { isLiverFunctionTestInvestigation } from "./liverFunctionTest";
import { isUltrasoundInvestigation } from "./ultrasoundScan";

export function isLaboratoryFormInvestigation(name: string): boolean {
  return (
    isHaematologyInvestigation(name) ||
    isBloodGlucoseInvestigation(name) ||
    isLiverFunctionTestInvestigation(name) ||
    isElectrolytesUreaInvestigation(name)
  );
}

export function isInvestigationFormEntry(name: string): boolean {
  return isLaboratoryFormInvestigation(name) || isUltrasoundInvestigation(name);
}
