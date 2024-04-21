import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import { NextRequest } from 'next/server';
import { getPostQueryParams } from '@/helpers/urlHelpers';
import discussifyApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";

export async function GET(request: NextRequest, { params }: { params: { queryParams: string } }) {
  try {
    const queryParams = getPostQueryParams(params.queryParams);
    const config = getAxiosConfigs(request, false,queryParams);
    const response = await discussifyApiClient.get('api/v1/posts', config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}