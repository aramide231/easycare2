import Stage1Labour from "./Stage1Labour";
import Stage2Pushing from "./Stage2Pushing";
import Stage3DeliveryOfPlacenta from "./Stage3Placenta";

export const childBirthRenderer: Record<string, React.ReactNode> = {
  "STAGE 1: LABOUR": <Stage1Labour />,
  "STAGE 2: PUSHING & BIRTHING": <Stage2Pushing />,
  "STAGE 3: DELIVERY OF PLACENTA": <Stage3DeliveryOfPlacenta />
};
