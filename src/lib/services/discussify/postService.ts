import {PostQueryParameters} from "@/boundary/parameters/postQueryParameters";
import {apiKey, internalBaseUrl} from "@/boundary/constants/appConstants";
import {
    CommentRequest,
    CreatePostRequest,
    EditPostReplyRequest,
    EditPostRequest,
    PostReplyRequest
} from "@/boundary/interfaces/post";

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

export async function addPostReplyAsync(commentRequest: PostReplyRequest) {
    try {
        const apiUrl = `${internalBaseUrl}/api/post/post-replies/create`;
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

export async function addCommentAsync(commentRequest: CommentRequest) {
    try {
        const apiUrl = `${internalBaseUrl}/api/post/post-replies/comments/create`;
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
        const apiUrl = `${internalBaseUrl}/api/post/post-replies/edit`;
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

export async function getLatestPosts(queryParams: PostQueryParameters) {
    try {
        const apiUrl = `${internalBaseUrl}/api/post/latest/${JSON.stringify(queryParams)}`;
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