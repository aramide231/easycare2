type Props = {
  title?: string;
  subtitle?: string;
};

export default function FormHeader({
  title = "Create a Profile",
  subtitle = "Fill the form to create a patient's profile",
}: Props) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-semibold text-2xl">{title}</h1>
      <p className="text-txt-muted">{subtitle}</p>
    </div>
  );
}
