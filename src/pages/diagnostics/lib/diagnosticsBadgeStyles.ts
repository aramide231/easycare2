export function treatmentTypeBadgeClass(type: string): string {
  switch (type) {
    case "PRIVATE":
      return "bg-blue-100 text-[#103488] border border-[#103488]";
    case "STAFF":
      return "bg-gray-100 text-gray-700 border border-gray-400";
    case "HMO":
      return "bg-orange-100 text-[#FA7401] border border-[#FA7401]";
    case "COMPANY":
      return "bg-purple-100 text-[#573FD1] border border-[#573FD1]";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-300";
  }
}

export function patientCategoryBadgeClass(type: string): string {
  switch (type) {
    case "OUT-PATIENT":
      return "bg-blue-100 text-[#103488] border border-[#103488]";
    case "IN-PATIENT":
      return "bg-orange-100 text-[#FA7401] border border-[#FA7401]";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-300";
  }
}
