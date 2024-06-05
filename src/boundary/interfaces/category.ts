import {ForumResponse} from "@/boundary/interfaces/forum";

export interface CategoryResponse {
    id: number;
    name: string;
    slug: string;
    description: string;
    isSystem:boolean;
    postCount : number;
    createdAt: string;
    updatedAt: string;
    forums: ForumResponse[]
}