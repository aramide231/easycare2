export default function PatientRegSuccess() {
  return (
    <div className="pt-15 flex flex-col items-center">
      <h1 className="font-semibold text-xl">
        Patient Profile Created Successfully
      </h1>
      <p className="text-txt-muted text-sm">
        You can now access your dashboard and manage patient care
      </p>
      <div className="mt-8">
        <button
          type="submit"
          className="bg-primary text-white text-center rounded-md px-16 py-1 text-sm cursor-pointer font-medium"
        >
          Go To Dashboard
        </button>
      </div>
    </div>
  );
}
