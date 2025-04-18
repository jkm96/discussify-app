import {apiKey, internalBaseUrl} from "@/boundary/constants/appConstants";
import {ToggleFollowLikeRequest} from "@/boundary/interfaces/shared";

export async function toggleFollowLikeAsync(likeRequest: ToggleFollowLikeRequest) {
    try {
        const apiUrl = `${internalBaseUrl}/api/shared/follow-like`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'x-api-key': `${apiKey}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(likeRequest),
        });

        return response.json();
    } catch (error) {
        throw error;
    }
}