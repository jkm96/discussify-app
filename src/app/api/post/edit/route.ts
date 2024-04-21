import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import { NextRequest } from 'next/server';
import { getPostQueryParams } from '@/helpers/urlHelpers';
import discussifyApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const postId = requestBody.postId;
    console.info("postId",postId)
    const config = getAxiosConfigs(request, true);
    const response = await discussifyApiClient.put(`api/v1/posts/${postId}/update`,requestBody, config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}