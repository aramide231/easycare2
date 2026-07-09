import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import clientimage from "@/assets/image/haywhy.jpg";
import AccountInformationTab from "./components/AccountInformationTab";
import { useDoctorProfile } from "./useDoctorProfile";
import type { DoctorProfile } from "./types";

const YourProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { profile, updateProfile, resetProfile } = useDoctorProfile();
  const [draft, setDraft] = useState<DoctorProfile>(profile);
  const [previewImage, setPreviewImage] = useState(
    profile.profileImageUrl || clientimage
  );

  useEffect(() => {
    setDraft(profile);
    setPreviewImage(profile.profileImageUrl || clientimage);
  }, [profile]);

  const handleDraftChange = (patch: Partial<DoctorProfile>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  };

  const handleImageChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
    handleDraftChange({ profileImageUrl: url });
  };

  const handleDeletePicture = () => {
    setPreviewImage(clientimage);
    handleDraftChange({ profileImageUrl: "" });
    toast.info("Profile picture removed.");
  };

  const handleUpdate = () => {
    updateProfile(draft);
    toast.success("Profile updated successfully.");
  };

  const handleDiscard = () => {
    resetProfile();
    toast.info("Changes discarded.");
    navigate("/doctor/account?tab=account");
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Your Profile</h1>
          <p className="mt-1 text-sm text-gray-500">
            Last Edited: {profile.lastEdited}
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/doctor/account?tab=account")}
          className="text-sm font-medium text-[#573FD1] hover:underline"
        >
          Back to account settings
        </button>
      </div>

      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-gray-200">
          <img
            src={previewImage}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageChange(file);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg border border-[#573FD1] px-5 py-2 text-sm font-medium text-[#573FD1] hover:bg-purple-50"
          >
            Change Picture
          </button>
          <button
            type="button"
            onClick={handleDeletePicture}
            className="rounded-lg border border-red-500 px-5 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Delete Picture
          </button>
        </div>
      </div>

      <AccountInformationTab
        profile={draft}
        onChange={handleDraftChange}
        columns={2}
      />

      <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-6">
        <button
          type="button"
          onClick={handleDiscard}
          className="rounded-lg border border-[#573FD1]/30 bg-purple-50 px-8 py-2.5 text-sm font-medium text-[#573FD1] hover:bg-purple-100"
        >
          Discard
        </button>
        <button
          type="button"
          onClick={handleUpdate}
          className="rounded-lg bg-[#573FD1] px-8 py-2.5 text-sm font-semibold text-white hover:bg-[#4a35b8]"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default YourProfile;
