export type ClaimStatus = "PENDING" | "DECLINED" | "ACCEPTED";

export type ClaimAction = "" | "Decline" | "Hold" | "Accept";

export type ClaimLineItem = {
  id: string;
  details: string;
  cost: number;
  paAuthCode: string;
  action: ClaimAction;
  status: ClaimStatus;
};

export type ClaimMedicationItem = ClaimLineItem & {
  strength: string;
  dosage: string;
  intervals: string;
  duration: string;
  qty: number;
  period: string;
};

export type ClaimsProcessorData = {
  presentingComplaints: string;
  clinicalDiagnosis: string;
  consultations: ClaimLineItem[];
  investigations: ClaimLineItem[];
  medications: ClaimMedicationItem[];
  procedures: ClaimLineItem[];
  physicianName: string;
  patientSignature: string;
};

export function actionToStatus(action: ClaimAction): ClaimStatus {
  switch (action) {
    case "Decline":
      return "DECLINED";
    case "Accept":
      return "ACCEPTED";
    case "Hold":
    default:
      return "PENDING";
  }
}

export function formatClaimCurrency(amount: number): string {
  return `N ${amount.toLocaleString("en-NG")}.00`;
}
