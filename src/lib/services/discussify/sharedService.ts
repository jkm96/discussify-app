import {apiKey, internalBaseUrl} from "@/boundary/constants/appConstants";
import {LikeRequest} from "@/boundary/interfaces/shared";

export async function saveLikeAsync(likeRequest: LikeRequest) {
    try {
        const apiUrl = `${internalBaseUrl}/api/shared/like`;
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