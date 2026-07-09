import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import AccountProfileSidebar from "./components/AccountProfileSidebar";
import AccountInformationTab from "./components/AccountInformationTab";
import HelpDeskTab from "./components/HelpDeskTab";
import LogoutTab from "./components/LogoutTab";
import { useDoctorProfile } from "./useDoctorProfile";
import type { AccountTab, DoctorProfile } from "./types";

const TABS: { id: AccountTab; label: string }[] = [
  { id: "account", label: "Account Information" },
  { id: "helpdesk", label: "Help Desk" },
  { id: "logout", label: "Logout" },
];

const AccountSettings = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { profile, updateProfile } = useDoctorProfile();
  const [draft, setDraft] = useState<DoctorProfile>(profile);

  const tabParam = searchParams.get("tab") as AccountTab | null;
  const activeTab: AccountTab =
    tabParam && TABS.some((tab) => tab.id === tabParam) ? tabParam : "account";

  useEffect(() => {
    setDraft(profile);
  }, [profile]);

  const setActiveTab = (tab: AccountTab) => {
    setSearchParams({ tab }, { replace: true });
  };

  const handleDraftChange = (patch: Partial<DoctorProfile>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  };

  const handleUpdate = () => {
    updateProfile(draft);
    toast.success("Account information updated successfully.");
  };

  const handleCancel = () => {
    setDraft(profile);
    toast.info("Changes discarded.");
  };

  return (
    <div className="flex min-h-[calc(100dvh-5.75rem)] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-4 pt-4 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-t-lg px-5 py-2.5 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-[#573FD1] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {activeTab !== "logout" && (
          <AccountProfileSidebar profile={profile} />
        )}

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6 lg:p-8">
            {activeTab === "account" && (
              <AccountInformationTab
                profile={draft}
                onChange={handleDraftChange}
                columns={3}
              />
            )}
            {activeTab === "helpdesk" && <HelpDeskTab />}
            {activeTab === "logout" && <LogoutTab />}
          </div>

          {activeTab === "account" && (
            <div className="flex shrink-0 justify-end gap-3 border-t border-gray-200 px-5 py-4 sm:px-6 lg:px-8">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg border border-gray-300 bg-white px-8 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                className="rounded-lg bg-[#573FD1] px-8 py-2.5 text-sm font-semibold text-white hover:bg-[#4a35b8]"
              >
                Update
              </button>
            </div>
          )}

          {activeTab === "helpdesk" && (
            <div className="flex shrink-0 justify-end border-t border-gray-200 px-5 py-4 sm:px-6 lg:px-8">
              <button
                type="button"
                onClick={() => navigate("/doctor/account/profile")}
                className="text-sm font-medium text-[#573FD1] hover:underline"
              >
                Open full profile editor
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
