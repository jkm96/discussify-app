import {handleApiException, handleAxiosResponse} from '@/helpers/responseHelpers';
import adminApiClient, {getAxiosConfigs} from '@/lib/axios/axiosClient';
import {NextRequest} from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { userId: number } }) {
  try {
    const userId = params.userId;
    const config = getAxiosConfigs(request,true);
    const response = await adminApiClient.get(`api/v1/admin/user-subscriptions/${userId}`, config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}