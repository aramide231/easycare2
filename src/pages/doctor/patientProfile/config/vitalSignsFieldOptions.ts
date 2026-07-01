export const VITAL_SIGNS_COMMENT_OPTIONS = [
  { value: "NORMAL_RANGE", label: "Normal Range" },
  { value: "NORMAL", label: "Normal" },
  { value: "ABNORMAL", label: "Abnormal" },
  { value: "ELEVATED", label: "Elevated" },
  { value: "LOW", label: "Low" },
  { value: "REQUIRES_REVIEW", label: "Requires Review" },
];

export const VITAL_SIGNS_COMMENT_FIELD = {
  name: "comment",
  label: "Comments",
  type: "select" as const,
  placeholder: "-Select option-",
  showInTable: false,
  options: VITAL_SIGNS_COMMENT_OPTIONS,
};
