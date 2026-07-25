import clientimage from "@hmo/assets/image/haywhy.jpg";
import { getPatientTypeClass } from "@hmo/pages/shared/lib/patientTypeStyles";
import type { HmoRegistrationRecord } from "../data/mockHmoRegistrationRecords";

type Props = {
  record: HmoRegistrationRecord;
  className?: string;
  style?: React.CSSProperties;
};

const typeDotClass: Record<HmoRegistrationRecord["hmoType"], string> = {
  HMO: "bg-[#FA7401]",
  PRIVATE: "bg-[#103488]",
  COMPANY: "bg-[#573FD1]",
  STAFF: "bg-[#626262]",
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <p className="text-xs leading-normal text-black">
    <span>{label} :</span> {value}
  </p>
);

const HmoRegistrationDetailCard = ({ record, className = "", style }: Props) => (
  <div
    className={`w-[275px] rounded-[15px] bg-[#EEECFA] p-5 shadow-[0_2px_2px_rgba(0,0,0,0.1)] ${className}`}
    style={style}
  >
    <div className="mb-4 flex items-center gap-2.5">
      <img
        src={clientimage}
        alt={record.contactPerson}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0">
        <p className="truncate text-[15px] tracking-[-0.3px] text-black">
          {record.contactPerson}
        </p>
        <p className="text-sm font-light tracking-[-0.28px] text-[#626262]">
          ID: {record.code}
        </p>
      </div>
    </div>

    <div className="space-y-4 border-t border-[#D4D4D4] pt-4">
      <div className="space-y-2">
        <p className="text-xs font-medium tracking-[-0.24px] text-[#573FD1]">
          HMO Details :
        </p>
        <div className="space-y-2">
          <DetailRow label="HMO Name" value={record.name} />
          <DetailRow label="HMO Code" value={record.code} />
          <DetailRow label="Pre-Auth Code" value={record.preAuthCode} />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium tracking-[-0.24px] text-[#573FD1]">
          HMO Contact Details :
        </p>
        <div className="space-y-2">
          <DetailRow label="Office Address" value={record.officeAddress} />
          <DetailRow label="Phone No" value={record.phoneNumber} />
          <DetailRow label="Contact Person" value={record.contactPerson} />
          <DetailRow label="Email Address" value={record.email} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-xs text-black">HMO Type:</p>
        <span
          className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium ${getPatientTypeClass(record.hmoType)}`}
        >
          <span
            className={`h-2 w-2 rounded-full ${typeDotClass[record.hmoType]}`}
          />
          {record.hmoType}
        </span>
      </div>
    </div>
  </div>
);

export default HmoRegistrationDetailCard;
