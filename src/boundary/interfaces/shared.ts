export interface ApiErrorResponse {
  data: string;
  statusCode: number;
  message: string;
  succeeded: boolean;
}

export interface ToggleFollowLikeRequest {
  recordId:number;
  type:string;
}

export interface LikeResponse {
  likes:number;
  users:[];
}