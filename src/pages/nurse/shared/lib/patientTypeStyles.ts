export function getPatientTypeClass(type: string): string {
  switch (type) {
    case "HMO":
      return "border border-[#FA7401] text-[#FA7401] bg-orange-50";
    case "PRIVATE":
      return "border border-[#103488] text-[#103488] bg-blue-50";
    case "COMPANY":
      return "border border-[#573FD1] text-[#573FD1] bg-purple-50";
    case "STAFF":
      return "border border-gray-500 text-gray-600 bg-gray-50";
    case "NHIS":
      return "border border-green-600 text-green-700 bg-green-50";
    default:
      return "border border-gray-300 text-gray-600 bg-gray-50";
  }
}
