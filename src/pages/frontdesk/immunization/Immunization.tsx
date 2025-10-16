import ImmunizationLog from "./components/ImmuniLog";

const Immunization = () => {
  return (
    <div className="flex h-screen w-full">
      <main className="flex-1 p-6 ">
        <div className=" gap-6 mt-6">
          <ImmunizationLog />
        </div>
      </main>
    </div>
  );
};

export default Immunization;
