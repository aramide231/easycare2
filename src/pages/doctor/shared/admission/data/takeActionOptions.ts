export type TakeActionOption = {
  id: string;
  label: string;
  successMessage: string;
};

export const TAKE_ACTION_OPTIONS: TakeActionOption[] = [
  {
    id: "absconded",
    label: "Absconded",
    successMessage: "Marked as absconded successfully",
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
    label: "Discharged (satisfactory)",
    successMessage: "Discharged successfully",
  },
  {
    id: "referred",
    label: "Referred",
    successMessage: "Referred successfully",
  },
];

export function getTakeActionSuccessMessage(actionId: string): string {
  return (
    TAKE_ACTION_OPTIONS.find((option) => option.id === actionId)
      ?.successMessage ?? "Action completed successfully"
  );
}
