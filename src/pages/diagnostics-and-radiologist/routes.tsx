import { Route } from "react-router-dom";
import DiagnosticsRadiologistLayout from "./layout/DiagnosticsRadiologistLayout";
import Dashboard from "./dashboard/Dashboard";
import Notifications from "./notifications/Notifications";
import MakeRequest from "./make-request/MakeRequest";
import InvestigativeList from "./investigative-list/InvestigativeList";
import SetReminder from "./set-reminder/SetReminder";
import InvestigationLogs from "./investigation-logs/InvestigationLogs";
import RequestLogs from "./request-logs/RequestLogs";
import VisitationLog from "./visitation/VisitationLog";
import { PatientRouteRedirect } from "@/components/patient/patientWorkspace";
import InvestigationProfile from "./investigation-profile/InvestigationProfile";

export function DiagnosticsRadiologistRoutes() {
  return (
    <Route
      path="/diagnostics-and-radiologist"
      element={<DiagnosticsRadiologistLayout />}
    >
      <Route index element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="make-request" element={<MakeRequest />} />
      <Route path="investigations-list" element={<InvestigativeList />} />
      <Route path="set-reminder" element={<SetReminder />} />
      <Route path="investigation-logs" element={<InvestigationLogs />} />
      <Route path="request-logs" element={<RequestLogs />} />
      <Route path="visitation-logs" element={<VisitationLog />} />
      <Route path="patient-profile/:id" element={<PatientRouteRedirect />} />
      <Route
        path="previous-patient-records/:id"
        element={<PatientRouteRedirect suffix="/history" />}
      />
      <Route
        path="investigation-profile/:id"
        element={<InvestigationProfile />}
      />
    </Route>
  );
}

export { DiagnosticsRadiologistLayout };
