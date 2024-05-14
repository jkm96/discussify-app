import {handleApiException, handleAxiosResponse} from '@/helpers/responseHelpers';
import discussifyApiClient, {getAxiosConfigs} from '@/lib/axios/axiosClient';
import {NextRequest} from 'next/server';
import {getPostQueryParams, getPostReplyQueryParams} from "@/helpers/urlHelpers";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const postSlug = data.postSlug;
    const queryParams = getPostReplyQueryParams(data.queryParams);
    const config = getAxiosConfigs(request,true,queryParams);
    const response = await discussifyApiClient.get(`api/v1/posts/${postSlug}/replies`, config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}