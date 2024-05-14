import {handleApiException, handleAxiosResponse} from '@/helpers/responseHelpers';
import adminApiClient, {getAxiosConfigs} from '@/lib/axios/axiosClient';
import {NextRequest} from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const config = getAxiosConfigs(request,true);
    const response = await adminApiClient.get('api/v1/admin/manage-feedback', config);
    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}