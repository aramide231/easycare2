import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface User {
  fullName: string;
  userRole: "frontdesk" | "nurse" | "doctor" | "admin";
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  userRole: "frontdesk" | "nurse" | "doctor" | "admin";
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  countryCode: number;
  userDesignations: string;
  userGender: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (data: SignupData) => Promise<void>;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true, // Initially set loading to true
  signup: async () => {},
  signIn: async () => false,
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state to track auth state check

  // Load user from localStorage on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem("mockUser");

      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed.name && parsed.userRole) {
          setUser({
            fullName: parsed.fullName,
            userRole: parsed.userRole || "frontdesk",
          });
        }
      }

      setLoading(false); // Done loading the auth data
    };

    checkAuth();
  }, []);

  const signup = async (data: SignupData) => {
    const fullName = `${data.firstName} ${data.lastName}`;

    console.log("Mock signup data:", data);

    localStorage.setItem(
      "mockUser",
      JSON.stringify({
        ...data,
        name: fullName, // Add full name for later use
      })
    );

    setUser({
      fullName: fullName,
      userRole: data.userRole,
    });
    await new Promise<void>((resolve) => setTimeout(resolve, 1000)); // Simulate async delay
  };

  const signIn = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const stored = localStorage.getItem("mockUser");
    if (!stored) return false;

    const parsed = JSON.parse(stored);
    if (parsed.email === username && parsed.password === password) {
      setUser({ fullName: parsed.name, userRole: parsed.userRole });
      return true;
    }

    return false;
  };

  const signOut = () => {
    localStorage.removeItem("mockUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
