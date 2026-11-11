export interface StaffUser {
  id: number;
  username: string;
  staff_code: string | null;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  name: string;
  email: string | null;
  is_active: boolean;
  department: { id: number; code: string; name: string } | null;
  roles: { code: string; name: string }[];
  permissions: string[];
  created_at: string;
  last_login_at: string | null;
}

export interface StaffSessionResponse {
  data: { user: StaffUser; csrf_token: string; expires_at: string };
}
