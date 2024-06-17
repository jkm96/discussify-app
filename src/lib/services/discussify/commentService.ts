import {apiKey, internalBaseUrl} from "@/boundary/constants/appConstants";
import {CommentRequest, EditCommentRequest, UpsertReplyRequest} from "@/boundary/interfaces/comment";
import {PostRepliesQueryParameters} from "@/boundary/parameters/postRepliesQueryParameters";

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

export async function editCommentAsync(commentRequest: EditCommentRequest) {
    try {
        const apiUrl = `${internalBaseUrl}/api/comments/edit`;
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


export async function upsertReplyAsync(replyRequest: UpsertReplyRequest) {
    try {
        const apiUrl = `${internalBaseUrl}/api/comments/upsert-replies`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(replyRequest),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getCommentsAsync(postReplyId: number,queryParams:PostRepliesQueryParameters) {
    try {
        const response = await fetch(`${internalBaseUrl}/api/post-replies/comments`, {
            method: 'POST',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                'postReplyId':postReplyId,
                'queryParams':queryParams
            }),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getRepliesAsync(commentId: number,queryParams:PostRepliesQueryParameters) {
    try {
        const response = await fetch(`${internalBaseUrl}/api/comments/nested-replies`, {
            method: 'POST',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                'commentId':commentId,
                'queryParams':queryParams
            }),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}