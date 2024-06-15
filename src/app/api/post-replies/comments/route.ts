import {handleApiException, handleAxiosResponse} from '@/helpers/responseHelpers';
import discussifyApiClient, {getAxiosConfigs} from '@/lib/axios/axiosClient';
import {NextRequest} from 'next/server';
import {getPostReplyQueryParams} from "@/helpers/urlHelpers";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const queryParams = getPostReplyQueryParams(data.queryParams);
    const config = getAxiosConfigs(request,false,queryParams);
    const response = await discussifyApiClient.get(`api/v1/post-replies/${data.postReplyId}/comments`, config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}