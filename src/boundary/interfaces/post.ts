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
