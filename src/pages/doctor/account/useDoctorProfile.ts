import { useCallback, useSyncExternalStore } from "react";
import { useAuth } from "@doctor-shared/context/useAuth";
import {
  DEFAULT_DOCTOR_PROFILE,
  type DoctorProfile,
} from "./types";

const PROFILE_KEY = "easyCareDoctorProfile";

let profileSnapshot: DoctorProfile = readStoredProfile();
const listeners = new Set<() => void>();

function readStoredProfile(): DoctorProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return { ...DEFAULT_DOCTOR_PROFILE };
    return { ...DEFAULT_DOCTOR_PROFILE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_DOCTOR_PROFILE };
  }
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return profileSnapshot;
}

function persistProfile(next: DoctorProfile) {
  profileSnapshot = next;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
  emitChange();
}

function mergeAuthIntoProfile(
  profile: DoctorProfile,
  fullName?: string,
  userRole?: string
): DoctorProfile {
  if (!fullName && !userRole) return profile;

  const parts = (fullName ?? profile.firstName).trim().split(/\s+/);
  const firstName = parts[0] ?? profile.firstName;
  const lastName = parts.length > 1 ? parts[parts.length - 1] : profile.lastName;
  const middleName =
    parts.length > 2 ? parts.slice(1, -1).join(" ") : profile.middleName;

  return {
    ...profile,
    firstName,
    lastName,
    middleName,
    username: fullName?.trim() || profile.username,
    userRole:
      userRole && userRole.length > 0
        ? userRole.charAt(0).toUpperCase() + userRole.slice(1)
        : profile.userRole,
    designation:
      userRole && userRole.length > 0
        ? userRole.charAt(0).toUpperCase() + userRole.slice(1)
        : profile.designation,
  };
}

export function useDoctorProfile() {
  const { user } = useAuth();
  const stored = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const profile = mergeAuthIntoProfile(
    stored,
    user?.fullName,
    user?.userRole
  );

  const updateProfile = useCallback(
    (patch: Partial<DoctorProfile>) => {
      const merged = mergeAuthIntoProfile(
        { ...profileSnapshot, ...patch, lastEdited: formatNow() },
        user?.fullName,
        user?.userRole
      );
      persistProfile(merged);
    },
    [user?.fullName, user?.userRole]
  );

  const resetProfile = useCallback(() => {
    persistProfile(
      mergeAuthIntoProfile(
        { ...DEFAULT_DOCTOR_PROFILE },
        user?.fullName,
        user?.userRole
      )
    );
  }, [user?.fullName, user?.userRole]);

  return { profile, updateProfile, resetProfile };
}

function formatNow() {
  const now = new Date();
  const day = now.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";
  const month = now.toLocaleString("en-GB", { month: "short" });
  const year = now.getFullYear();
  const time = now.toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${day}${suffix} ${month} ${year}, ${time}`;
}
