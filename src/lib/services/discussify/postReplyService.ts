import {apiKey, internalBaseUrl} from "@/boundary/constants/appConstants";
import {EditPostReplyRequest, PostReplyRequest} from "@/boundary/interfaces/post";

export async function addPostReplyAsync(commentRequest: PostReplyRequest) {
    try {
        const apiUrl = `${internalBaseUrl}/api/post-replies/create`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(commentRequest),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function editPostReplyAsync(editPostReplyRequest: EditPostReplyRequest) {
    try {
        const apiUrl = `${internalBaseUrl}/api/post-replies/edit`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(editPostReplyRequest),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getPostRepliesAsync(postSlug: string) {
    try {
        const response = await fetch(`${internalBaseUrl}/api/post/${postSlug}/post-replies`, {
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