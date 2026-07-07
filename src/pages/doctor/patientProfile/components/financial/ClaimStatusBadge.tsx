import type { ClaimStatus } from "./claimsProcessorTypes";

const STATUS_STYLES: Record<
  ClaimStatus,
  { label: string; className: string }
> = {
  PENDING: {
    label: "PEND",
    className: "bg-[#F5A623] text-white",
  },
  DECLINED: {
    label: "DECLINED",
    className: "bg-[#E53935] text-white",
  },
  ACCEPTED: {
    label: "ACCEPT",
    className: "bg-[#43A047] text-white",
  },
};

type Props = {
  status: ClaimStatus;
};

export default function ClaimStatusBadge({ status }: Props) {
  const { label, className } = STATUS_STYLES[status];

  return (
    <span
      className={`inline-flex min-w-[88px] items-center justify-center rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wide ${className}`}
    >
      {label}
    </span>
  );
}
