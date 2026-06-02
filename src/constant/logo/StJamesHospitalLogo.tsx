import stJamesHospitalLogo from "@/assets/logos/st-peter-hospital.png";

interface StJamesHospitalLogoProps {
  text?: string;
  className?: string;
}

export default function StJamesHospitalLogo({
  text = "Welcome back! Please log in.",
  className = "mb-10",
}: StJamesHospitalLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-10 h-10 shrink-0">
        <img
          className="w-full h-full object-contain"
          src={stJamesHospitalLogo}
          alt="St. James Hospital Logo"
        />
      </div>

      <div className="flex flex-col justify-center">
        <h2 className="font-semibold font-hanken text-txt leading-tight">
          St James Hospital
        </h2>

        {text && <p className="text-xs text-[#333333] mt-0.5">{text}</p>}
      </div>
    </div>
  );
}
