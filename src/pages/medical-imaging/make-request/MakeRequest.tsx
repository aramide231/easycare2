import InvestigationFormEntry from "./components/InvestigationFormEntry";
import InvestigationFormPatientPanel from "./components/InvestigationFormPatientPanel";

const MakeRequest = () => {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr]">
      <InvestigationFormPatientPanel />
      <InvestigationFormEntry />
    </div>
  );
};

export default MakeRequest;
