 'use client';
 import React, {useEffect, useState} from 'react';
 import {User} from '@/boundary/interfaces/user';
 import AuthContext from './authContext';
 import {AccessTokenModel} from '@/boundary/interfaces/token';
 import {deleteAccessToken, getAccessToken, storeAccessTokenInCookie} from '@/lib/services/token/tokenService';
 import {toast} from "react-toastify";

 type AuthContextProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isGracePeriodExpired, setIsGracePeriodExpired] = useState(false); // Add state for grace period
  const [loading, setLoading] = useState(true);

  const storeAuthToken = async (tokenData: AccessTokenModel):Promise<boolean> => {
    try {
      const cookieRequest: AccessTokenModel = {
        token: tokenData.token,
        user: tokenData.user,
      };

      const response = await storeAccessTokenInCookie(cookieRequest);
      if (response.statusCode == 200) {
        const userObject: User = {
          commentsCount: tokenData.user.commentsCount,
          pointsEarned: tokenData.user.pointsEarned,
          postRepliesCount: tokenData.user.postRepliesCount,
          postsCount: tokenData.user.postsCount,
          reactionScore: tokenData.user.reactionScore,
          gracePeriodCount: tokenData.user.gracePeriodCount,
          isGracePeriodExpired: tokenData.user.isGracePeriodExpired ,
          id: tokenData.user.id,
          username: tokenData.user.username,
          email: tokenData.user.email,
          isEmailVerified: tokenData.user.isEmailVerified,
          isSubscribed: tokenData.user.isSubscribed,
          isAdmin: tokenData.user.isAdmin,
          isModerator:tokenData.user.isModerator,
          profileUrl: tokenData.user.profileUrl ?? '',
          profileCoverUrl: tokenData.user.profileCoverUrl ?? ''
        };
        setUser(userObject);
        setIsGracePeriodExpired(tokenData.user.isGracePeriodExpired); // Set grace period state
        return true;
      } else {
        return false;
      }
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const clearAuthToken = async () => {
    const response = await deleteAccessToken();
    if (response.statusCode === 200) {
      setUser(null);
    }
  };

  useEffect(() => {
    const fetchAccessToken = async () => {
      const response = await getAccessToken();
      if (response.statusCode === 200) {
        const tokenResponse = JSON.parse(response.data);
        setUser(tokenResponse.user);
        setIsGracePeriodExpired(tokenResponse.user.isGracePeriodExpired); // Set grace period state
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchAccessToken().catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, storeAuthToken, clearAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}
