export default function EasyCareMark({
  className = "w-8 h-8",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="40" height="40" rx="8" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5 7.5C16.1193 7.5 15 8.61929 15 10V15H10C8.61929 15 7.5 16.1193 7.5 17.5V22.5C7.5 23.8807 8.61929 25 10 25H15V30C15 31.3807 16.1193 32.5 17.5 32.5H22.5C23.8807 32.5 25 31.3807 25 30V25H30C31.3807 25 32.5 23.8807 32.5 22.5V17.5C32.5 16.1193 31.3807 15 30 15H25V10C25 8.61929 23.8807 7.5 22.5 7.5H17.5Z"
        fill="#573FD1"
      />
    </svg>
  );
}
