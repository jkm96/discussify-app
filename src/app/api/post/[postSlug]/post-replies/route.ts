import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import discussifyApiClient , { getAxiosConfigs } from '@/lib/axios/axiosClient';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { postSlug: string } }) {
  try {
    const postSlug = params.postSlug;
    const config = getAxiosConfigs(request,false);
    const response = await discussifyApiClient.get(`api/v1/posts/${postSlug}/replies`, config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}