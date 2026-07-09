import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const LogoutTab = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/auth");
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-10 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
        <LogOut className="h-10 w-10 text-red-600" strokeWidth={1.75} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900">Logout</h3>
      <p className="mt-3 text-sm text-gray-600">
        Are you sure you want to logout from EasyCare? You will need to sign in
        again to access your account.
      </p>
      <div className="mt-8 flex w-full gap-3">
        <button
          type="button"
          onClick={() => navigate("/doctor")}
          className="flex-1 rounded-lg border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-600 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutTab;
