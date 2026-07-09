import { useState } from "react";
import { toast } from "react-toastify";
import { formFieldTextareaClass } from "@/pages/doctor/patientProfile/lib/formFieldStyles";

const HelpDeskTab = () => {
  const [message, setMessage] = useState("");
  const [restrictAccount, setRestrictAccount] = useState<"no" | "yes" | null>(
    null
  );

  const handleSubmit = () => {
    if (!message.trim()) {
      toast.error("Please enter your message before submitting.");
      return;
    }
    toast.success("Your message has been sent to the help desk.");
    setMessage("");
  };

  const handleRestrict = (value: "no" | "yes") => {
    setRestrictAccount(value);
    if (value === "yes") {
      toast.info("Account restriction request submitted.");
      return;
    }
    toast.info("Account restriction cancelled.");
  };

  return (
    <div className="max-w-3xl">
      <h3 className="text-base font-semibold text-gray-900">Help Desk</h3>
      <p className="mt-2 text-sm text-gray-600">
        Do you have Questions, Report issues, Raise concerns, Give Suggestions?
        !!
      </p>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Comment Box:
        </label>
        <textarea
          rows={8}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter Message Here............"
          className={formFieldTextareaClass}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-4 rounded-lg bg-[#573FD1] px-8 py-2.5 text-sm font-semibold text-white hover:bg-[#4a35b8]"
        >
          Submit
        </button>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-8">
        <p className="text-sm font-medium text-gray-800">
          Do You Want To Restrict Your Account?
        </p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => handleRestrict("no")}
            className={`rounded-lg border px-8 py-2.5 text-sm font-medium transition ${
              restrictAccount === "no"
                ? "border-[#573FD1] bg-[#573FD1] text-white"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            No
          </button>
          <button
            type="button"
            onClick={() => handleRestrict("yes")}
            className={`rounded-lg border px-8 py-2.5 text-sm font-medium transition ${
              restrictAccount === "yes"
                ? "border-red-600 bg-red-600 text-white"
                : "border-red-300 bg-white text-red-600 hover:bg-red-50"
            }`}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpDeskTab;
