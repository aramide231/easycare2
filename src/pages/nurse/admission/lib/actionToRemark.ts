import type { DischargeRemark } from "@/pages/nurse/discharge/data/mockDischargedPatients";

export function actionIdToRemark(actionId: string): DischargeRemark {
  switch (actionId) {
    case "absconded":
      return "Absconded";
    case "dama":
      return "DAMA";
    case "deceased":
      return "Deceased";
    case "discharged":
      return "Discharged";
    case "referred":
      return "Referred";
    default:
      return "Discharged";
  }
}
