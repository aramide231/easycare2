import { useLayoutEffect, useRef, type ReactNode } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export default function SessionBoundary({ children }: { children: ReactNode }) {
  const revision = useAuthStore((state) => state.revision);
  const location = useLocation();
  const navigation = useNavigationType();
  const navigate = useNavigate();
  const scope = useRef(-1);
  const knownEntries = useRef(new Set<string>());
  const changed = scope.current !== revision;
  const unsafeState = location.state !== null
    && (changed || (navigation === "POP" && !knownEntries.current.has(location.key)));

  useLayoutEffect(() => {
    if (scope.current !== revision) {
      scope.current = revision;
      knownEntries.current.clear();
    }
    if (unsafeState) {
      navigate(location.pathname + location.search + location.hash, { replace: true, state: null });
    } else {
      knownEntries.current.add(location.key);
    }
  }, [revision, location.key, location.pathname, location.search, location.hash, unsafeState, navigate]);

  return unsafeState ? null : <div key={revision}>{children}</div>;
}
