import { useNavigate } from "react-router-dom";
import ModuleSelectionModal, {
  type PreviewModule,
} from "@/components/preview/ModuleSelectionModal";

const modulePaths: Record<PreviewModule, string> = {
  nurse: "/nurse/dashboard",
  doctor: "/doctor",
};

const PreviewEntry = () => {
  const navigate = useNavigate();

  const handleSelect = (module: PreviewModule) => {
    navigate(modulePaths[module]);
  };

  return <ModuleSelectionModal onSelect={handleSelect} />;
};

export default PreviewEntry;
