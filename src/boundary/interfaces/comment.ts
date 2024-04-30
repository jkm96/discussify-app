import {UserResponse} from "@/boundary/interfaces/user";

export interface CommentResponse {
    id: number;
    userId: number;
    postReplyId: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    user: UserResponse;
}

export interface CommentRequest {
    postReplyId: number;
    description: string;
}
