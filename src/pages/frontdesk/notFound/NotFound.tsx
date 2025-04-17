import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-2">
          Page not found
        </p>
        <p className="text-gray-600 mb-6">
          The page you're looking for is still under development
        </p>
        <Link
          to="/frontdesk/dashboard"
          className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
