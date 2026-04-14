import Stage1Labour from "./categories/childbirth/Stage1Labour";
import Stage2Pushing from "./categories/childbirth/Stage2Pushing";
import Stage3Placenta from "./categories/childbirth/Stage3Placenta";
import Stage4DeliveryNote from "./categories/childbirth/Stage4DeliveryNote";

type Props = {
  label: string;
};

const ComponentRenderer = ({ label }: Props) => {

  switch (label) {
    case "STAGE 1: LABOUR":
      return <Stage1Labour />;

    case "STAGE 2: PUSHING & BIRTHING":
      return <Stage2Pushing />;

    case "STAGE 3: DELIVERY OF PLACENTA":
      return <Stage3Placenta />;

    case "STAGE 4: DELIVERY NOTE":
      return <Stage4DeliveryNote />;

    default:
      return <div className="text-gray-400">Component coming soon</div>;
  }
};

export default ComponentRenderer;
