import { lazy } from "react";
import { Route } from "react-router-dom";

import HmoLayout from "@hmo/layouts/HmoLayout";

const HmoDashboard = lazy(() => import("@hmo/pages/dashboard/Dashboard"));
const HmoNotifications = lazy(
  () => import("@hmo/pages/notifications/Notifications"),
);
const HmoRegistration = lazy(
  () => import("@hmo/pages/hmo-management/registration/Registration"),
);
const HmoAccountReview = lazy(
  () => import("@hmo/pages/hmo-management/account-review/AccountReview"),
);
const HmoBillSummary = lazy(
  () => import("@hmo/pages/hmo-management/bill-summary/BillSummary"),
);
const HmoClaimsProcessor = lazy(
  () => import("@hmo/pages/hmo-management/claims-processor/ClaimsProcessor"),
);
const HmoAdmission = lazy(
  () => import("@hmo/pages/patient-management/admission/Admission"),
);
const HmoAvailableWard = lazy(
  () => import("@hmo/pages/patient-management/available-ward/AvailableWard"),
);
const HmoDischarge = lazy(
  () => import("@hmo/pages/patient-management/discharge/Discharge"),
);
const HmoServiceList = lazy(
  () => import("@hmo/pages/perform-action/service-list/ServiceList"),
);
const HmoSetReminder = lazy(
  () => import("@hmo/pages/perform-action/set-reminder/SetReminder"),
);
const HmoAnteNatalLogs = lazy(
  () => import("@hmo/pages/reports/ante-natal-logs/AnteNatalLogs"),
);
const HmoChildBirthLogs = lazy(
  () => import("@hmo/pages/reports/child-birth-logs/ChildBirthLogs"),
);
const HmoDischargedLogs = lazy(
  () => import("@hmo/pages/reports/discharged-logs/DischargedLogs"),
);
const HmoInsRegistrationLogs = lazy(
  () => import("@hmo/pages/reports/ins-registration-logs/InsRegistrationLogs"),
);
const HmoPreAuthorisationLogs = lazy(
  () =>
    import("@hmo/pages/reports/pre-authorisation-logs/PreAuthorisationLogs"),
);
const HmoPatientProfile = lazy(
  () => import("@hmo/pages/patient-profile/PatientProfile"),
);
const HmoFlagProfile = lazy(
  () => import("@hmo/pages/patient-profile/flag-profile/FlagProfile"),
);
const PreviousPatientRecords = lazy(
  () => import("@hmo/vendor/previous-records/PreviousPatientRecords"),
);

/**
 * HMO module routes — self-contained under /hmo.
 * Mount inside RoleBasedRoutes (preview-accessible like frontdesk).
 */
export function HmoRoutes() {
  return (
    <Route path="/hmo" element={<HmoLayout />}>
      <Route index element={<HmoDashboard />} />
      <Route path="dashboard" element={<HmoDashboard />} />
      <Route path="notifications" element={<HmoNotifications />} />
      <Route path="registration" element={<HmoRegistration />} />
      <Route path="account-review" element={<HmoAccountReview />} />
      <Route path="bill-summary" element={<HmoBillSummary />} />
      <Route path="claims-processor" element={<HmoClaimsProcessor />} />
      <Route path="admission" element={<HmoAdmission />} />
      <Route path="available-ward" element={<HmoAvailableWard />} />
      <Route path="discharge" element={<HmoDischarge />} />
      <Route path="service-list" element={<HmoServiceList />} />
      <Route path="reminder" element={<HmoSetReminder />} />
      <Route path="ante-natal-logs" element={<HmoAnteNatalLogs />} />
      <Route path="child-birth-logs" element={<HmoChildBirthLogs />} />
      <Route path="discharged-logs" element={<HmoDischargedLogs />} />
      <Route path="ins-registration-logs" element={<HmoInsRegistrationLogs />} />
      <Route
        path="pre-authorisation-logs"
        element={<HmoPreAuthorisationLogs />}
      />
      <Route path="patient-profile/:id" element={<HmoPatientProfile />} />
      <Route path="flag-profile/:id" element={<HmoFlagProfile />} />
      <Route
        path="previous-patient-records/:patientId"
        element={<PreviousPatientRecords />}
      />
    </Route>
  );
}

export { HmoLayout };
