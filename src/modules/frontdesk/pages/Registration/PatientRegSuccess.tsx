import { Navigate } from "react-router-dom";

export default function PatientRegSuccess() {
  return <Navigate to="/patients" replace state={null} />;
}
