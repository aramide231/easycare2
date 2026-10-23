type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({ label, handleChange, ...props }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-txt text-sm font-medium">{label}</label>
      <input
        className="w-full rounded-md px-4 py-2 border-2 focus:outline-txt focus:outline-2 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
        {...props}
        onChange={handleChange ?? (() => {})}
      />
    </div>
  );
}
