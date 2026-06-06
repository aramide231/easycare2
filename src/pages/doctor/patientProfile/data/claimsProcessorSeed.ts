import type { ClaimsProcessorData } from "../components/financial/claimsProcessorTypes";

export const CLAIMS_PROCESSOR_SEED: ClaimsProcessorData = {
  presentingComplaints:
    "Patient complained of swelling in the head, discomfort, and anxiety. " +
    "The swelling has been persistent for several days with associated pain " +
    "when touched. Patient reports difficulty sleeping due to discomfort.",
  clinicalDiagnosis: "1 CHICKEN POX R/O SEPSIS",
  consultations: [
    {
      id: "c1",
      details: "General Consultation",
      cost: 5000,
      paAuthCode: "",
      action: "Decline",
      status: "DECLINED",
    },
    {
      id: "c2",
      details: "Dental Consultation",
      cost: 15000,
      paAuthCode: "",
      action: "Hold",
      status: "PENDING",
    },
    {
      id: "c3",
      details: "Neural Consultation",
      cost: 7000,
      paAuthCode: "",
      action: "Accept",
      status: "ACCEPTED",
    },
  ],
  investigations: [
    {
      id: "i1",
      details: "Malaria Parasite",
      cost: 5000,
      paAuthCode: "",
      action: "Decline",
      status: "DECLINED",
    },
    {
      id: "i2",
      details: "Genotype",
      cost: 10000,
      paAuthCode: "",
      action: "Hold",
      status: "PENDING",
    },
  ],
  medications: [
    {
      id: "m1",
      details: "PARACETAMOL",
      strength: "500MG",
      dosage: "STAT",
      intervals: "Days",
      duration: "1",
      qty: 30,
      period: "Days",
      cost: 30000,
      paAuthCode: "",
      action: "Hold",
      status: "PENDING",
    },
    {
      id: "m2",
      details: "CALAMINE LOTION",
      strength: "500MG",
      dosage: "STAT",
      intervals: "Days",
      duration: "1",
      qty: 1,
      period: "Days",
      cost: 5000,
      paAuthCode: "",
      action: "Accept",
      status: "ACCEPTED",
    },
  ],
  procedures: [
    {
      id: "p1",
      details: "Wound Dressing",
      cost: 5000,
      paAuthCode: "",
      action: "Hold",
      status: "PENDING",
    },
  ],
  physicianName: "Dr Adebimpe Ayisat",
  patientSignature: "",
};
