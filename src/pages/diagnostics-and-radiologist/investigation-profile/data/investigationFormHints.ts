/** Wireframe hint / reference text for investigation metadata fields. */
export const INVESTIGATION_METADATA_HINTS = {
  requestDateTime: "capture time of investigation request sent",
  requestedBy: "capture name of staff that made the request",
  resultDateTime: "capture time result was done and Submitted",
  doneBy: "capture name of staff that logged in result",
} as const;

export const OGTT_FIELD_HINTS = {
  time: "Time",
  result: "Result",
} as const;

export const URINARY_PROTEIN_FIELD_HINTS = {
  time: "Time",
  range: "Range",
} as const;

export const MICRO_ALBIUM_FIELD_HINTS = {
  time: "Time",
  range: "Range",
} as const;
