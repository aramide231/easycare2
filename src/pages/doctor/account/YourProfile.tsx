import { Link } from "react-router-dom";
import StaffProfileDetails from "@/components/header/StaffProfileDetails";

export default function YourProfile() {
  return <section className="mx-auto w-full max-w-4xl space-y-6 rounded-xl border bg-white p-6 shadow-sm">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-xl font-bold">Your profile</h1>
      <Link to="/doctor/account?tab=account" className="text-sm text-[#573FD1] underline">Back to account settings</Link>
    </div>
    <StaffProfileDetails />
  </section>;
}
