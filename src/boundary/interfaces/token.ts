import {UserResponse} from '@/boundary/interfaces/user';

export interface RefreshTokenRequest {
  token: string;
  refreshToken: string;
}

export interface Token {
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface AccessTokenModel {
  token: Token;
  user: UserResponse;
}