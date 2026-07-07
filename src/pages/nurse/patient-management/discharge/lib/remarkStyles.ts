import type { DischargeRemark } from "../data/mockDischargedPatients";

export function getRemarkClass(remark: DischargeRemark): string {
  switch (remark) {
    case "Absconded":
      return "text-[#573FD1]";
    case "Discharged":
      return "text-green-600";
    case "DAMA":
      return "text-red-600";
    case "Referred":
      return "text-blue-600";
    case "Deceased":
      return "text-gray-600";
    default:
      return "text-gray-600";
  }
}

export function getRemarkDotClass(remark: DischargeRemark): string {
  switch (remark) {
    case "Absconded":
      return "bg-[#573FD1]";
    case "Discharged":
      return "bg-green-600";
    case "DAMA":
      return "bg-red-600";
    case "Referred":
      return "bg-blue-600";
    case "Deceased":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
}
