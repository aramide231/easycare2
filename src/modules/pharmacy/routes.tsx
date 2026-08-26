import { lazy } from "react";
import { Route } from "react-router-dom";

import PharmacyLayout from "@pharmacy/layouts/PharmacyLayout";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

const PharmacyDashboard = lazy(
  () => import("@pharmacy/pages/dashboard/PharmacyDashboard"),
);
const PharmacyNotifications = lazy(
  () => import("@pharmacy/pages/notifications/PharmacyNotifications"),
);
const MainStore = lazy(() => import("@pharmacy/pages/main-store/MainStore"));
const Purchases = lazy(() => import("@pharmacy/pages/purchases/Purchases"));
const DispenseStore = lazy(
  () => import("@pharmacy/pages/dispense-store/DispenseStore"),
);
const MedTracking = lazy(
  () => import("@pharmacy/pages/med-tracking/MedTracking"),
);
const ReturnMed = lazy(() => import("@pharmacy/pages/return-med/ReturnMed"));
const PurchaseLogs = lazy(
  () => import("@pharmacy/pages/purchase-logs/PurchaseLogs"),
);
const ReminderPage = lazy(
  () => import("@pharmacy/vendor/reminder/ReminderPage"),
);

/**
 * Pharmacy module routes — self-contained under /pharmacy.
 */
export function PharmacyRoutes() {
  return (
    <Route path="/pharmacy" element={<PharmacyLayout />}>
      <Route index element={<PharmacyDashboard />} />
      <Route path="notifications" element={<PharmacyNotifications />} />
      <Route path="main-store" element={<MainStore />} />
      <Route path="purchases" element={<Purchases />} />
      <Route path="dispense-store" element={<DispenseStore />} />
      <Route path="med-tracking" element={<MedTracking />} />
      <Route
        path="store-request"
        element={<ComingSoonPage title="Store Request" />}
      />
      <Route path="return-med" element={<ReturnMed />} />
      <Route path="set-reminder" element={<ReminderPage />} />
      <Route
        path="admission-logs"
        element={<ComingSoonPage title="Admission Logs" />}
      />
      <Route
        path="discharge-logs"
        element={<ComingSoonPage title="Discharge Logs" />}
      />
      <Route path="purchase-logs" element={<PurchaseLogs />} />
      <Route
        path="dispensed-med-logs"
        element={<ComingSoonPage title="Dispensed Med. Logs" />}
      />
      <Route path="inventory" element={<ComingSoonPage title="Inventory" />} />
      <Route
        path="main-store-logs"
        element={<ComingSoonPage title="Main Store Logs" />}
      />
      <Route
        path="request-logs"
        element={<ComingSoonPage title="Request Logs" />}
      />
      <Route
        path="return-logs"
        element={<ComingSoonPage title="Return Logs" />}
      />
      <Route
        path="patient-profile/:id"
        element={<ComingSoonPage title="Patient Profile" />}
      />
      <Route
        path="previous-patient-records/:id"
        element={<ComingSoonPage title="Previous Patient Records" />}
      />
    </Route>
  );
}

export { PharmacyLayout };
