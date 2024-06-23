import {handleApiException, handleAxiosResponse} from '@/helpers/responseHelpers';
import petDiariesApiClient, {getAxiosConfigs} from '@/lib/axios/axiosClient';
import {NextRequest} from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const config = getAxiosConfigs(request);
    const requestBody = await request.json();
    const {contentId} = requestBody;
    const{data} = requestBody;
    const response = await petDiariesApiClient
      .put(`api/v1/site-content/${contentId}`, data,config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}