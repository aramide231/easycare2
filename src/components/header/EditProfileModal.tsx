import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import StaffProfileDetails from "./StaffProfileDetails";

export default function EditProfileModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <Dialog open={open} onOpenChange={(next) => { if (!next) onClose(); }}>
    <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Staff profile</DialogTitle>
        <DialogDescription>Your staff details from the hospital server.</DialogDescription>
      </DialogHeader>
      <StaffProfileDetails />
    </DialogContent>
  </Dialog>;
}
