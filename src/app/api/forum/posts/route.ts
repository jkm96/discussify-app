import {handleApiException, handleAxiosResponse} from '@/helpers/responseHelpers';
import discussifyApiClient, {getAxiosConfigs} from '@/lib/axios/axiosClient';
import {NextRequest} from 'next/server';
import {getForumPostsQueryParams} from '@/helpers/urlHelpers';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const queryParams = getForumPostsQueryParams(data.queryParams);
    const config = getAxiosConfigs(request,true, queryParams);
    const response = await discussifyApiClient.get(`api/v1/forums/${data.forumSlug}/posts`, config);
    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}