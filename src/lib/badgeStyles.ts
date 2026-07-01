export function getPatientTypeClass(type: string): string {
  switch (type) {
    case "COMPANY":
      return "bg-blue-100 text-[#573FD1] border border-[#573FD1]";
    case "PRIVATE":
      return "bg-[#E7EBF3] text-[#103488] border border-[#103488]";
    case "HMO":
      return "bg-orange-100 text-[#FA7401] border border-[#FA7401]";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-300";
  }
}

export function getVisitTypeClass(type: string): string {
  switch (type) {
    case "GEN. CONSULT":
      return "bg-blue-100 text-[#573FD1] border border-[#573FD1]";
    case "ANTE. NATAL":
      return "bg-green-100 text-green-700 border border-[#00C851]";
    case "POST NATAL":
      return "bg-[#FDFDFD] text-[#626262] border border-[#626262]";
    case "CHILDBIRTH":
      return "bg-[#E7EBF3] text-[#103488] border border-[#103488]";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-300";
  }
}
