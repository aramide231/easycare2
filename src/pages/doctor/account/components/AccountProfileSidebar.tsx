import clientimage from "@/assets/image/haywhy.jpg";
import type { DoctorProfile } from "../types";

type Props = {
  profile: DoctorProfile;
  imageUrl?: string;
};

const AccountProfileSidebar = ({ profile, imageUrl }: Props) => {
  const displayImage = imageUrl || profile.profileImageUrl || clientimage;
  const fullName = `${profile.firstName} ${profile.middleName} ${profile.lastName}`
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();

  return (
    <aside className="w-full shrink-0 border-r border-gray-200 bg-white p-5 lg:w-64 xl:w-72">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-gray-200 bg-gray-100">
          <img
            src={displayImage}
            alt={fullName}
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="text-sm font-bold tracking-wide text-gray-900">
          {fullName}
        </h2>
        <p className="mt-1 text-xs text-gray-500">
          User Role:{" "}
          <span className="font-medium text-gray-700">{profile.userRole}</span>
        </p>
      </div>

      <div className="mt-6 space-y-3 text-xs text-gray-600">
        <p>
          <span className="font-medium text-gray-700">Reg Date:</span>{" "}
          {profile.registrationDate}
        </p>
        <p>
          <span className="font-medium text-gray-700">Last Login:</span>{" "}
          {profile.lastLogin}
        </p>
        <p>
          <span className="font-medium text-gray-700">Last Seen:</span>{" "}
          {profile.lastEdited}
        </p>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-medium text-gray-700">Account Completion</span>
          <span className="font-semibold text-[#573FD1]">
            {profile.accountCompletion}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-[#573FD1] transition-all"
            style={{ width: `${profile.accountCompletion}%` }}
          />
        </div>
        {profile.accountCompletion < 100 && (
          <p className="mt-2 text-xs text-orange-600">Not Completed</p>
        )}
      </div>
    </aside>
  );
};

export default AccountProfileSidebar;
