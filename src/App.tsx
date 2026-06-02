import RoleBasedRoutes from "./routes/RoleBasedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <RoleBasedRoutes />
      <ToastContainer position="bottom-center" autoClose={2500} />
    </div>
  );
}

export default App;
