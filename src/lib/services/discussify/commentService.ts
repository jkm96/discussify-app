import {CommentRequest} from "@/boundary/interfaces/post";
import {apiKey, internalBaseUrl} from "@/boundary/constants/appConstants";

export async function addCommentAsync(commentRequest: CommentRequest) {
    try {
        const apiUrl = `${internalBaseUrl}/api/comments/create`;
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

export async function getCommentsAsync(postReplyId: string) {
    try {
        const response = await fetch(`${internalBaseUrl}/api/post-replies/${postReplyId}/comments`, {
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