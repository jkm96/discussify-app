import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import discussifyApiClient , { getAxiosConfigs } from '@/lib/axios/axiosClient';
import { NextRequest } from 'next/server';
import {getForumPostsQueryParams} from '@/helpers/urlHelpers';

export async function GET(request: NextRequest, { params }: { params: { queryParams: string } }) {
  try {
    const queryParams = getForumPostsQueryParams(params.queryParams);
    const config = getAxiosConfigs(request,false, queryParams);
    const response = await discussifyApiClient.get(`api/v1/forums/${queryParams.forumSlug}/posts`, config);
    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}