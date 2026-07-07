import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, User } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { formatOrdinalDate } from "@/lib/dateTime";
import {
  readStoredUserProfile,
  writeStoredUserProfile,
  type StoredUserProfile,
} from "@/lib/userProfileStorage";
import clientimage from "@/assets/image/haywhy.jpg";

type FormState = {
  firstName: string;
  lastName: string;
  middleName: string;
  userGender: string;
  registrationDate: string;
  userDesignations: string;
  password: string;
  phoneNumber: string;
  email: string;
  userRole: string;
  stateCountry: string;
  confirmPassword: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

function toFormState(profile: StoredUserProfile): FormState {
  return {
    firstName: profile.firstName,
    lastName: profile.lastName,
    middleName: profile.middleName,
    userGender: profile.userGender,
    registrationDate: profile.registrationDate,
    userDesignations: profile.userDesignations,
    password: profile.password,
    phoneNumber: profile.phoneNumber,
    email: profile.email,
    userRole: capitalizeRole(profile.userRole),
    stateCountry: profile.stateCountry,
    confirmPassword: profile.password,
  };
}

function capitalizeRole(role: string) {
  if (!role) return "";
  return role.charAt(0).toUpperCase() + role.slice(1);
}

const fieldClass =
  "h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 focus:border-[#573FD1] focus:outline-none focus:ring-2 focus:ring-[#573FD1]/20";

const labelClass = "mb-1.5 block text-xs font-medium text-gray-700";

const readOnlyFieldClass =
  "h-9 w-full rounded-lg border border-gray-200 px-3 text-sm";

const EditProfileModal = ({ open, onClose }: Props) => {
  const { user, updateSessionUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const storedProfile = useMemo(
    () => readStoredUserProfile(user?.userRole ?? "nurse"),
    [user?.userRole],
  );

  const [form, setForm] = useState<FormState>(() => toFormState(storedProfile));
  const [profileImage, setProfileImage] = useState<string | null>(
    storedProfile.profileImage,
  );
  const [lastEdited, setLastEdited] = useState(storedProfile.lastEdited);

  useEffect(() => {
    if (!open) return;
    const profile = readStoredUserProfile(user?.userRole ?? "nurse");
    setForm(toFormState(profile));
    setProfileImage(profile.profileImage);
    setLastEdited(profile.lastEdited);
  }, [open, user?.userRole]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const displayName = `${form.firstName} ${form.middleName} ${form.lastName}`
    .replace(/\s+/g, " ")
    .trim();
  const staffBadge = `${displayName || user?.fullName || "User"} (${storedProfile.staffId})`;

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setProfileImage(objectUrl);
    event.target.value = "";
  };

  const handleUpdate = () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      toast.error("First name and last name are required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Password and confirm password do not match.");
      return;
    }

    const editedOn = formatOrdinalDate(new Date());
    const nextProfile: StoredUserProfile = {
      ...storedProfile,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      middleName: form.middleName.trim(),
      userGender: form.userGender,
      registrationDate: form.registrationDate,
      userDesignations: form.userDesignations,
      password: form.password,
      phoneNumber: form.phoneNumber.trim(),
      email: form.email.trim(),
      userRole: form.userRole.toLowerCase(),
      stateCountry: form.stateCountry.trim(),
      name: displayName,
      lastEdited: editedOn,
      profileImage,
    };

    writeStoredUserProfile(nextProfile);
    setLastEdited(editedOn);
    updateSessionUser({
      fullName: displayName,
      userRole: nextProfile.userRole,
    });

    toast.success("Profile updated successfully.");
    onClose();
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close edit profile"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Edit Profile"
        className="relative z-10 w-full max-w-3xl rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50"
            aria-label="Go back"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h2 className="text-lg font-bold text-gray-900">Edit Profile</h2>
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700">
            <User className="h-3 w-3 shrink-0" aria-hidden />
            <span className="truncate">{staffBadge}</span>
          </div>
          <p className="text-xs text-gray-500">Last Edited : {lastEdited}</p>
        </div>

        <div className="mb-5 flex items-center gap-4 border-b border-gray-200 pb-5">
          <img
            src={profileImage ?? clientimage}
            alt={displayName || "Profile"}
            className="h-14 w-14 shrink-0 rounded-full border border-gray-200 object-cover"
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg border border-[#573FD1]/30 bg-purple-50 px-3 py-1.5 text-sm font-medium text-[#573FD1] hover:bg-purple-100"
            >
              Change Picture
            </button>
            <button
              type="button"
              onClick={() => setProfileImage(null)}
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100"
            >
              Delete Picture
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label className={labelClass}>Last Name</label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>First Name</label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Middle Name</label>
            <input
              type="text"
              value={form.middleName}
              onChange={(e) => updateField("middleName", e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Mobile Number</label>
            <input
              type="text"
              value={form.phoneNumber}
              onChange={(e) => updateField("phoneNumber", e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Gender</label>
            <input
              type="text"
              value={form.userGender}
              onChange={(e) => updateField("userGender", e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Registration Date</label>
            <input
              type="text"
              value={form.registrationDate}
              readOnly
              disabled
              placeholder="DD/MM/YYYY"
              className={`${readOnlyFieldClass} bg-gray-100 text-gray-500`}
            />
          </div>
          <div>
            <label className={labelClass}>User Role</label>
            <input
              type="text"
              value={form.userRole}
              readOnly
              className={`${readOnlyFieldClass} bg-gray-50 text-gray-700`}
            />
          </div>
          <div>
            <label className={labelClass}>Designation</label>
            <input
              type="text"
              value={form.userDesignations}
              onChange={(e) => updateField("userDesignations", e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>State / Country</label>
            <input
              type="text"
              value={form.stateCountry}
              onChange={(e) => updateField("stateCountry", e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Confirm Password</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-purple-100 py-2.5 text-sm font-semibold text-[#573FD1] hover:bg-purple-200"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            className="rounded-lg bg-[#573FD1] py-2.5 text-sm font-semibold text-white hover:bg-[#4a35b8]"
          >
            Update
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default EditProfileModal;
