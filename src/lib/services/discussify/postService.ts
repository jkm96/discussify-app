import {PostQueryParameters} from "@/boundary/parameters/postQueryParameters";
import {apiKey, internalBaseUrl} from "@/boundary/constants/appConstants";
import {CreatePostRequest, EditPostRequest} from "@/boundary/interfaces/post";

export async function createPostAsync(createRequest: CreatePostRequest) {
    try {
        const apiUrl = `${internalBaseUrl}/api/post/create`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(createRequest),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function editPostAsync(editPostRequest: EditPostRequest) {
    try {
        const apiUrl = `${internalBaseUrl}/api/post/edit`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(editPostRequest),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getLatestPosts(queryParams: PostQueryParameters) {
    try {
        const apiUrl = `${internalBaseUrl}/api/post/latest`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                'queryParams':queryParams
            }),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getCoverPostsAsync() {
    try {
        const apiUrl = `${internalBaseUrl}/api/post/cover`;
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

export async function getPostDetailsAsync(postSlug: string) {
    try {
        const response = await fetch(`${internalBaseUrl}/api/post/${postSlug}`, {
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