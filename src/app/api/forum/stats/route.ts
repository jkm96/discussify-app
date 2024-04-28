import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import discussifyApiClient , { getAxiosConfigs } from '@/lib/axios/axiosClient';
import { NextRequest } from 'next/server';
import {getForumPostsQueryParams} from '@/helpers/urlHelpers';

export async function GET(request: NextRequest) {
  try {
    const config = getAxiosConfigs(request,false);
    const response = await discussifyApiClient.get('api/v1/initialize/stats', config);
    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}