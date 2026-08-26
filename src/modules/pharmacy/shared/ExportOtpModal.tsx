import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const DEMO_EXPORT_OTP = "1234";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
};

const ExportOtpModal = ({ isOpen, onClose, onVerified }: Props) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const firstFocusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setOtp("");
      setError(null);
      const timer = window.setTimeout(() => firstFocusRef.current?.focus(), 50);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (error) setError(null);

    if (value.length !== 4) return;

    if (value === DEMO_EXPORT_OTP) {
      onVerified();
    } else {
      setError("Invalid OTP. Please try again.");
      setOtp("");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/25 p-4 backdrop-blur-md"
      role="presentation"
    >
      <div
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-otp-title"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2
              id="export-otp-title"
              className="text-lg font-bold text-gray-900"
            >
              Enter OTP
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Enter the 4-digit code to download this report.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close OTP verification"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex justify-center">
          <InputOTP
            ref={firstFocusRef}
            maxLength={4}
            value={otp}
            onChange={handleOtpChange}
            containerClassName="justify-center gap-3"
          >
            <InputOTPGroup className="gap-3">
              {[0, 1, 2, 3].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="h-14 w-14 rounded-lg border border-[#D4D4D4] text-lg font-semibold text-gray-900 shadow-none first:rounded-lg first:border-l last:rounded-lg"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {error && (
          <p className="mt-4 text-center text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
};

export default ExportOtpModal;
