import RoleBasedRoutes from "./routes/RoleBasedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SessionBoundary from "@/components/guards/SessionBoundary";

function App() {
  return (
    <SessionBoundary>
      <RoleBasedRoutes />
      <ToastContainer position="bottom-center" autoClose={2500} />
    </SessionBoundary>
  );
}

export default App;
