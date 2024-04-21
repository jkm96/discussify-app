import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import adminApiClient, { getAxiosConfigs } from '@/lib/axios/axiosClient';
import { NextRequest } from 'next/server';
import { getUserQueryParams } from '@/helpers/urlHelpers';

export async function GET(request: NextRequest, { params }: { params: { queryParams: string } }) {
  try {
    const queryParams = getUserQueryParams(params.queryParams);
    const config = getAxiosConfigs(request, queryParams);
    const response = await adminApiClient.get('api/v1/admin/manage-users', config);
    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}