export function treatmentTypeBadgeClass(type: string): string {
  switch (type) {
    case "HMO":
      return "border border-[#FA7401] bg-orange-50 text-[#FA7401]";
    case "PRIVATE":
      return "border border-[#103488] bg-blue-50 text-[#103488]";
    case "COMPANY":
      return "border border-[#573FD1] bg-purple-50 text-[#573FD1]";
    case "STAFF":
      return "border border-gray-500 bg-gray-50 text-gray-600";
    case "NHIS":
      return "border border-green-600 bg-green-50 text-green-700";
    default:
      return "border border-gray-300 bg-gray-50 text-gray-600";
  }
}

export function patientCategoryBadgeClass(type: string): string {
  switch (type) {
    case "OUT-PATIENT":
      return "border border-[#103488] bg-blue-50 text-[#103488]";
    case "IN-PATIENT":
      return "border border-[#FA7401] bg-orange-50 text-[#FA7401]";
    default:
      return "border border-gray-300 bg-gray-50 text-gray-600";
  }
}
