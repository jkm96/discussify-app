import {PostResponse} from "@/boundary/interfaces/post";

export interface ForumResponse {
    id: number;
    categoryId: number;
    title: string;
    slug: string;
    description: string;
    avatarUrl: string;
    isSystem:boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ForumStatsResponse{
    id: number;
    members: number;
    posts: number;
    forumId: string;
    forumName: string;
    forumDescription: string;
    createdAt: string;
    updatedAt: string;
}

export interface ForumPostsResponse{
    forum: ForumResponse;
    posts: PostResponse[];
}