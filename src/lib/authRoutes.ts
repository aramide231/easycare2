export const ROLE_HOME_PATHS: Record<string, string> = {
  frontdesk: "/frontdesk",
  nurse: "/nurse/dashboard",
  doctor: "/doctor",
  admin: "/admin",
};

export function getRoleHomePath(role: string): string {
  return ROLE_HOME_PATHS[role] ?? "/auth?tab=signin";
}

export const AUTH_SIGNIN_PATH = "/auth?tab=signin";
