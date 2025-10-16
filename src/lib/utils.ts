import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PatientData } from "@/types/patient";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Patient Storage

export const getAllPatients = (): PatientData[] => {
  const stored = localStorage.getItem("mockPatients");
  return stored ? JSON.parse(stored) : [];
};

export const savePatient = (newPatient: PatientData) => {
  const patients = getAllPatients();
  patients.push(newPatient);
  localStorage.setItem("mockPatients", JSON.stringify(patients));
};

export const updatePatient = (index: number, updatedPatient: PatientData) => {
  const patients = getAllPatients();
  patients[index] = updatedPatient;
  localStorage.setItem("mockPatients", JSON.stringify(patients));
};

export const deletePatient = (index: number) => {
  const patients = getAllPatients();
  patients.splice(index, 1);
  localStorage.setItem("mockPatients", JSON.stringify(patients));
};
