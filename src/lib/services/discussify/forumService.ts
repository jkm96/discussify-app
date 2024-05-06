import {PostQueryParameters} from "@/boundary/parameters/postQueryParameters";
import {apiKey, internalBaseUrl} from "@/boundary/constants/appConstants";
import {ForumPostsQueryParameters} from "@/boundary/parameters/forumPostsQueryParameters";

export async function getForumStatsAsync() {
    try {
        const apiUrl = `${internalBaseUrl}/api/forum/stats`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: null,
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getForums(queryParams: PostQueryParameters) {
    try {
        const apiUrl = `${internalBaseUrl}/api/forum/latest/${JSON.stringify(queryParams)}`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: null,
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getForumPosts(queryParams: ForumPostsQueryParameters) {
    try {
        const apiUrl = `${internalBaseUrl}/api/forum/posts/${JSON.stringify(queryParams)}`;
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: null,
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}
