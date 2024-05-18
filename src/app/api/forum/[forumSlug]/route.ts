import {handleApiException, handleAxiosResponse} from '@/helpers/responseHelpers';
import discussifyApiClient, {getAxiosConfigs} from '@/lib/axios/axiosClient';
import {NextRequest} from 'next/server';

export async function GET(request: NextRequest,{ params }: { params: { forumSlug: string } }) {
  try {
    const slug = params.forumSlug
    const config = getAxiosConfigs(request,true);
    const response = await discussifyApiClient.get(`api/v1/forums/${slug}`, config);
    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}