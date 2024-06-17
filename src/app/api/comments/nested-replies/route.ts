import {handleApiException, handleAxiosResponse} from '@/helpers/responseHelpers';
import {NextRequest} from 'next/server';
import discussifyApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";
import {getPostReplyQueryParams} from "@/helpers/urlHelpers";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const queryParams = getPostReplyQueryParams(data.queryParams);
    const config = getAxiosConfigs(request, true,queryParams);
    const response = await discussifyApiClient.get(`api/v1/post-replies/comments/${data.commentId}/nested-replies`, config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}