import { PatientData } from "@/types/patient";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface User {
  fullName: string;
  userRole: string;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  userRole: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  countryCode: number;
  userDesignations: string;
  userGender: string;
}

interface PatientProps {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  phone?: string;
  maritalStatus?: string;
  dob?: string;
  age?: string;
  religion?: string;
  picture?: File | null;
  patientType?: string;
  insuranceProvider?: string;
  insuranceGroupNumber?: string;
  patientId?: string;
  insurancePolicyNumber?: string;
  employerName?: string;
  treatmentGuide?: string;
  planType?: string;
  eligibility?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (data: SignupData) => Promise<void>;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => void;
  creationOfPatient: (patient: PatientProps) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signup: async () => {},
  signIn: async () => false,
  signOut: () => {},
  creationOfPatient: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem("mockUser");

      // if (storedUser) {
      //   const parsed = JSON.parse(storedUser);
      //   if (parsed.name && parsed.userRole) {
      //     setUser({
      //       fullName: parsed.name,
      //       userRole: parsed.userRole || "frontdesk",
      //     });
      //   }
      // }
     console.log(storedUser)
      setLoading(false);
    };

    checkAuth();
  }, []);

  const signup = async (data: SignupData) => {
    const fullName = `${data.firstName} ${data.lastName}`;
    localStorage.setItem(
      "mockUser",
      JSON.stringify({
        ...data,
        name: fullName,
      })
    );

    setUser({
      fullName,
      userRole: data.userRole,
    });

    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    const stored = localStorage.getItem("mockUser");
    if (!stored) return false;

    const parsed = JSON.parse(stored);
    if (parsed.email === email && parsed.password === password) {
      setUser({ fullName: parsed.name, userRole: parsed.userRole });
      return true;
    }

    return false;
  };

  const signOut = () => {
    localStorage.removeItem("mockUser");
    setUser(null);
  };

  const creationOfPatient = (data: PatientData) => {
    const stored = JSON.parse(localStorage.getItem("patients") || "[]");
    const updated = [...stored, data];
    localStorage.setItem("patients", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, signIn, signOut, creationOfPatient }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
