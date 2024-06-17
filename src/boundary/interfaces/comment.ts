import {UserResponse} from "@/boundary/interfaces/user";

export interface CommentResponse {
    id: number;
    userId: number;
    postReplyId: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    repliesCount: number;
    user: UserResponse;
}

export interface CommentRequest {
    postReplyId: number;
    description: string;
}

export interface EditCommentRequest {
    commentId: number;
    postReplyId: number;
    description: string;
}

export interface UpsertReplyRequest {
    command: number;
    parentRecordId: number|null;
    recordId: number|null;
    description: string;
}
