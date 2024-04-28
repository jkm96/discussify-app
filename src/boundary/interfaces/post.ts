import {UserResponse} from "@/boundary/interfaces/user";
import {ForumResponse} from "@/boundary/interfaces/forum";

export interface PostResponse {
    id: number;
    forumId: number;
    userId: number;
    title: string;
    description: string;
    tags: string;
    sticker: any;
    postRepliesCount: number;
    commentsCount: number;
    views: number;
    participants: number;
    likes: number;
    createdAt: string;
    updatedAt: string;
    slug: string;
    user: UserResponse;
    forum: ForumResponse;
}

export interface PostRepliesResponse {
    id: number;
    forumId: number;
    userId: number;
    title: string;
    description: string;
    tags: string;
    sticker: any;
    createdAt: string;
    updatedAt: string;
    slug: string;
    user: UserResponse;
    forum: ForumResponse;
}

export interface CreatePostRequest {
    forumSlug: string;
    title: string;
    description: string;
    tags: string;
}

export interface EditPostRequest {
    postId: number;
    title: string;
    description: string;
}

export interface PostReplyRequest {
    postId: number;
    description: string;
}

export interface EditPostReplyRequest {
    postId: number;
    postReplyId: number;
    description: string;
}
