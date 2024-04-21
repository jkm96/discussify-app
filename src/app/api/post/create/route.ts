import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import { NextRequest } from 'next/server';
import { getPostQueryParams } from '@/helpers/urlHelpers';
import discussifyApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";

export async function GET(request: NextRequest, { params }: { params: { queryParams: string } }) {
  try {
    const requestBody = await request.json();
    const config = getAxiosConfigs(request, true);
    const response = await discussifyApiClient.post('api/v1/posts/create',requestBody, config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}