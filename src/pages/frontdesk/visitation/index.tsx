import PatientsLog from "../dashboard/components/patientLog";

const Visitation = () => {
  return (
    <div className="flex h-screen w-full">
      <main className="flex-1 p-6">
        <div className="gap-6 mt-6">
          <PatientsLog onSelectPatient={() => {}} />
        </div>
      </main>
    </div>
  );
};

export default Visitation;
