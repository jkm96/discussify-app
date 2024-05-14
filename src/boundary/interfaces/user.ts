export interface User {
  id: number;
  username: string;
  email: string;
  profileUrl: string;
  profileCoverUrl: string;
  isEmailVerified: boolean;
  isSubscribed: boolean;
  isAdmin: boolean;
  postsCount: number;
  postRepliesCount: number;
  commentsCount: number;
  pointsEarned: number;
  reactionScore: number;
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
  postsCount: number;
  postRepliesCount: number;
  commentsCount: number;
  pointsEarned: number;
  reactionScore: number;
  isEmailVerified: boolean;
  isSubscribed: boolean;
  isAdmin: boolean;
  isActive: boolean;
  emailVerifiedAt: string;
  createdAt: string;
  updatedAt: string;
  followers: number;
  following: number;
  likes: number;
}