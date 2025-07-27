import DoctorLog from "./components/DoctorLog";

const DoctorAssignment = () => {
  return (
    <div className="flex h-screen w-full">
      <main className="flex-1 p-6 ">
        <div className=" gap-6 mt-6">
          <DoctorLog />
        </div>
      </main>
    </div>
  );
};

export default DoctorAssignment;
