export type TakeActionOption = {
  id: string;
  label: string;
  successMessage: string;
};

export const TAKE_ACTION_OPTIONS: TakeActionOption[] = [
  {
    id: "absconded",
    label: "Abscond",
    successMessage: "Patient marked as absconded",
  },
  {
    id: "dama",
    label: "DAMA",
    successMessage: "DAMA recorded successfully",
  },
  {
    id: "deceased",
    label: "Deceased",
    successMessage: "Deceased status recorded successfully",
  },
  {
    id: "discharged",
    label: "Discharge (satisfactory)",
    successMessage: "Patient discharged successfully",
  },
  {
    id: "referred",
    label: "Refer",
    successMessage: "Patient referred successfully",
  },
];

export function getTakeActionSuccessMessage(actionId: string): string {
  return (
    TAKE_ACTION_OPTIONS.find((option) => option.id === actionId)
      ?.successMessage ?? "Action completed successfully"
  );
}
