/** Next-appointment / follow-up dose dates — today and future only. */
export function isFutureAppointmentDateField(fieldName: string): boolean {
  const key = fieldName.trim().toLowerCase();
  return (
    key.includes("appointment") ||
    key === "nextdosedate" ||
    key === "nextdoseduedate"
  );
}
