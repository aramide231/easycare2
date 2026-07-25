export function DashboardLayoutIcon({
  color = "currentColor",
  size = 24,
  className = "",
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M5 2h14c1.657 0 3 1.343 3 3v6H2V5c0-1.657 1.343-3 3-3zM2 13h9v9H5c-1.657 0-3-1.343-3-3v-6zM13 13h9v6c0 1.657-1.343 3-3 3h-6v-9z"
        fill={color}
      />
    </svg>
  );
}
export function ReceiptIcon({
  color = "currentColor",
  size = 24,
  className = "",
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      {/* Main Body & Cutout (Compound Path) */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2v14H3v3c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V2l-1.5 1.5z M19 19c0 .55-.45 1-1 1s-1-.45-1-1v-3H8V5h11v14z"
        fill={color}
      />

      {/* Inner Lines (Items) */}
      <path d="M10 7.5h4.5v1.5H10zM10 11.5h4.5v1.5H10z" fill={color} />

      {/* Inner Circles (Prices/Dots) */}
      <circle cx="16.5" cy="8.25" r="1.1" fill={color} />
      <circle cx="16.5" cy="12.25" r="1.1" fill={color} />
    </svg>
  );
}
export function AddAlertIcon({
  color = "currentColor",
  size = 24,
  className = "",
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 4.2C16.4 4.8 19 7.7 19 11.5V18h3v2H2v-2h3v-6.5C5 7.7 7.6 4.8 11 4.2V3c0-.55.45-1 1-1s1 .45 1 1v1.2z M11 8.5h2v2h2v2h-2v2h-2v-2H9v-2h2v-2z M9.5 21c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5h-5z"
        fill={color}
      />
    </svg>
  );
}
export function BlockIcon({
  color = "currentColor",
  size = 24,
  className = "",
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9L6.9 5.69C8.25 4.63 9.95 4 12 4zm-8 8c0-1.85.63-3.55 1.69-4.9l11.41 11.41C15.75 19.37 14.05 20 12 20c-4.42 0-8-3.58-8-8z"
      />
    </svg>
  );
}
// export function BreastfeedingIcon({
//   color = "currentColor",
//   size = 24,
//   className = "",
//   ...props
// }) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width={size}
//       height={size}
//       viewBox="0 0 40 62"
//       fill="none"
//       className={className}
//       {...props}
//     >
//       {/* Head */}
//       <circle cx="20" cy="9" r="8" fill={color} />

//       {/* Shoulders */}
//       <path
//         d="M0 30C3 25 9 22 15 22H25C31 22 37 25 40 30V34H0V30Z"
//         fill={color}
//       />

//       {/* Main body */}
//       <path
//         d="M4 34C4 25 11 20 20 20C29 20 36 27 36 36V49C36 55 31 60 25 60H16C9 60 4 55 4 48V34Z"
//         fill={color}
//       />

//       {/* Baby head cutout */}
//       <circle cx="28" cy="37" r="5" fill="white" />

//       {/* Baby body cutout */}
//       <path d="M16 46C19 43 23 43 26 46L31 52H10L16 46Z" fill="white" />

//       {/* Lower curve cutout */}
//       <path d="M22 52V62H9C5 62 2 59 0 55L8 52H22Z" fill="white" />
//     </svg>
//   );
// }
export function BreastfeedingIcon({
  color = "currentColor",
  size = 24,
  className = "",
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 1C7.57 1 6 2.57 6 4.5S7.57 8 9.5 8 13 6.43 13 4.5 11.43 1 9.5 1zM2 18c0-5.5 4.5-9 10-9s10 3.5 10 9v4h-3.5c0-3-1.5-4.5-3-4.5-1.5 0-3 1-3 2.5v2H2zM15.5 11.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"
        fill={color}
      />
    </svg>
  );
}

export function BabyIcon({
  color = "currentColor",
  size = 24,
  className = "",
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z M7 14h10c0 2.761-2.239 5-5 5s-5-2.239-5-5z M8.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M15.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M9.5 4C9.5 6 14.5 6 14.5 4c0-.5-1-.5-1 0 0 1.5-3 1.5-3 0 0-.5-1-.5-1 0z"
        fill={color}
      />
    </svg>
  );
}
export function FamilyIcon({
  color = "currentColor",
  size = 24,
  className = "",
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 48"
      fill="none"
      className={className}
      {...props}
    >
      {/* Top group outline */}
      <path
        d="
          M18 22
          C8 22 2 15 2 7
          C2 2 6 -2 11 -2
          C16 -2 20 1 22 5
          C24 1 28 -2 33 -2
          C38 -2 42 1 44 5
          C46 1 50 -2 55 -2
          C60 -2 64 2 64 8
          C64 16 58 22 48 22
        "
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Center person */}
      <circle cx="32" cy="26" r="7" fill={color} />
      <path d="M20 46C20 39 25 34 32 34C39 34 44 39 44 46" fill={color} />

      {/* Left person */}
      <circle cx="10" cy="32" r="5" fill={color} />
      <path d="M1 46C1 41 5 37 10 37C15 37 19 41 19 46" fill={color} />

      {/* Right person */}
      <circle cx="54" cy="32" r="5" fill={color} />
      <path d="M45 46C45 41 49 37 54 37C59 37 63 41 63 46" fill={color} />
    </svg>
  );
}
export function GridMenuIcon({
  color = "currentColor",
  size = 24,
  className = "",
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      {/* Top Pill */}
      <rect x="2" y="3" width="20" height="7" rx="3.5" fill={color} />
      {/* Bottom Pill */}
      <rect x="2" y="14" width="20" height="7" rx="3.5" fill={color} />
    </svg>
  );
}
export function PregnantWomanIcon({
  color = "currentColor",
  size = 26,
  className = "",
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M11 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm5 11c-.01-1.34-.83-2.51-2-3 0-1.66-1.34-3-3-3s-3 1.34-3 3v7h2v5h3v-5h3v-4z"
        fill={color}
      />
    </svg>
  );
}
