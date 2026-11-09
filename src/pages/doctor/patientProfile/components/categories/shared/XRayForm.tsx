import Investigation from "./Investigation";

/** X-Ray (Radiography) - same look as Investigation, stored and priced separately. */
export default function XRayForm() {
  return <Investigation fieldLayout="wide-investigation" variant="xray" />;
}
