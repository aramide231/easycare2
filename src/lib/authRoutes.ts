export const ROLE_HOME_PATHS: Record<string, string> = {
  frontdesk: "/frontdesk",
  nurse: "/nurse/dashboard",
  doctor: "/doctor",
  admin: "/admin",
  hmo: "/hmo/dashboard",
};

export function getRoleHomePath(role: string): string {
  return ROLE_HOME_PATHS[role] ?? "/auth?tab=signin";
}

export const AUTH_SIGNIN_PATH = "/auth?tab=signin";

/** Prefer the module in the URL so preview/demo navigation stays in the right area. */
export function getActiveModuleRole(
  pathname: string,
  userRole?: string | null,
): string {
  if (pathname.startsWith("/doctor")) return "doctor";
  if (pathname.startsWith("/nurse")) return "nurse";
  if (pathname.startsWith("/frontdesk")) return "frontdesk";
  if (pathname.startsWith("/hmo")) return "hmo";
  if (pathname.startsWith("/admin")) return "admin";
  return userRole?.toLowerCase() || "nurse";
}
