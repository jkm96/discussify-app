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
            next: {revalidate: 60},
            body: null,
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getForums() {
    try {
        const apiUrl = `${internalBaseUrl}/api/forum/list`;
        const response = await fetch(apiUrl, {
            method: 'POST',
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

export async function getForumBySlugAsync(slug: string) {
    try {
        const apiUrl = `${internalBaseUrl}/api/forum/${slug}`;
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
        const apiUrl = `${internalBaseUrl}/api/forum/posts`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                'queryParams': queryParams
            }),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}
