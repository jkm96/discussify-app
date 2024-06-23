import {handleApiException, handleAxiosResponse} from '@/helpers/responseHelpers';
import petDiariesApiClient, {getAxiosConfigs} from '@/lib/axios/axiosClient';
import {NextRequest} from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { contentId: string } }) {
  try {
    const contentId = params.contentId;
    const config = getAxiosConfigs(request);
    const response = await petDiariesApiClient.get(`api/v1/site-content/${contentId}`, config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}