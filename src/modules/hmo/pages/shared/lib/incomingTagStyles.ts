export type IncomingType =
  | "GEN. CONSULT"
  | "FAMILY PLAN"
  | "ANTE. NATAL"
  | "CHILDBIRTH"
  | "POST NATAL";

export function getIncomingTagClass(type: IncomingType): string {
  switch (type) {
    case "FAMILY PLAN":
      return "border border-[#FA7401] text-[#FA7401] bg-[#FFF1E6]";
    case "POST NATAL":
      return "border border-[#626262] text-[#626262] bg-[#FDFDFD]";
    case "CHILDBIRTH":
      return "border border-[#103488] text-[#103488] bg-[#E7EBF3]";
    case "ANTE. NATAL":
      return "border border-[#B0EEC9] text-[#00C851] bg-[#E6FAEE]";
    default:
      return "border border-[#573FD1] text-[#573FD1] bg-[#EEECFA]";
  }
}
