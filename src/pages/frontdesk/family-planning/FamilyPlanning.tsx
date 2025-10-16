import FamilyReport from "./components/FamilyReport";

const FamilyPlanning = () => {
  return (
    <div className="flex h-screen w-full">
      <main className="flex-1 p-6 ">
        <div className=" gap-6 mt-6">
          <FamilyReport />
        </div>
      </main>
    </div>
  );
};

export default FamilyPlanning;
