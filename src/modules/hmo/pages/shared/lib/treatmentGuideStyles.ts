export function getTreatmentGuideClass(guide: string): string {
  switch (guide) {
    case "PRIVATE":
      return "border border-[#103488] text-[#103488] bg-blue-50";
    case "FEE FOR SERVICE":
      return "border border-[#573FD1] text-[#573FD1] bg-purple-50";
    case "CAPITATED":
      return "border border-green-600 text-green-700 bg-green-50";
    default:
      return "border border-gray-300 text-gray-600 bg-gray-50";
  }
}
