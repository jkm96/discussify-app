import {PostResponse} from "@/boundary/interfaces/post";

export interface ForumResponse {
    id: number;
    categoryId: number;
    title: string;
    slug: string;
    description: string;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
}

export interface ForumPostsResponse{
    forum: ForumResponse;
    posts: PostResponse[];
}