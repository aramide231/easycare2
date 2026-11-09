import Investigation from "./Investigation";

/** Medical Imaging (scans) - same look as Investigation, stored and priced separately. */
export default function MedicalImagingForm() {
  return <Investigation fieldLayout="wide-investigation" variant="imaging" />;
}
