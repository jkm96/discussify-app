export interface User {
  id: number;
  username: string;
  email: string;
  profileUrl: string;
  profileCoverUrl: string;
  isEmailVerified: boolean;
  isSubscribed: boolean;
  isAdmin: boolean;
  gracePeriodCount: number;
  isGracePeriodExpired: boolean;
}

export interface UserResponse {
  isGracePeriodExpired: boolean;
  gracePeriodCount: number;
  id: number;
  username: string;
  email: string;
  profileUrl: string | null;
  profileCoverUrl: string | null;
  isEmailVerified: boolean;
  isSubscribed: boolean;
  isAdmin: boolean;
  isActive: boolean;
  emailVerifiedAt: string;
  createdAt: string;
  updatedAt: string;
  permissions: number[];
}