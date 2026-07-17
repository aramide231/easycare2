type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({ label, handleChange, ...props }: Props) {
  return (
    <div className="mt-6 flex flex-col">
      <label className="text-txt">{label}</label>
      <input
        className="input-field"
        {...props}
        onChange={handleChange ?? (() => {})}
      />
    </div>
  );
}
