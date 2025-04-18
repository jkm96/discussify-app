import {PostResponse} from "@/boundary/interfaces/post";

export interface ForumResponse {
    id: number;
    categoryId: number;
    title: string;
    slug: string;
    description: string;
    avatarUrl: string;
    isSystem:boolean;
    views: number;
    threads : number;
    messages : number;
    createdAt: string;
    updatedAt: string;
    participants: number;
    latestPost: PostResponse;
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