import {apiKey, internalBaseUrl} from "@/boundary/constants/appConstants";
import {EditPostReplyRequest, PostReplyRequest} from "@/boundary/interfaces/post";
import {PostRepliesQueryParameters} from "@/boundary/parameters/postRepliesQueryParameters";

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

export async function getPostRepliesAsync(postSlug: string,queryParams:PostRepliesQueryParameters) {
    try {
        const response = await fetch(`${internalBaseUrl}/api/post/post-replies`, {
            method: 'POST',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                'postSlug':postSlug,
                'queryParams':queryParams,
            }),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}