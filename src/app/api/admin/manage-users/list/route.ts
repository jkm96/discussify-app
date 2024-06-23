import {handleApiException, handleAxiosResponse} from '@/helpers/responseHelpers';
import adminApiClient, {getAxiosConfigs} from '@/lib/axios/axiosClient';
import {NextRequest} from 'next/server';
import {getPostQueryParams} from '@/helpers/urlHelpers';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const queryParams = getPostQueryParams(data.queryParams);
    const config = getAxiosConfigs(request,true, queryParams);
    const response = await adminApiClient.get('api/v1/admin/manage-users', config);
    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}