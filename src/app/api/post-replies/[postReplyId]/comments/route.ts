import { handleApiException, handleAxiosResponse } from '@/helpers/responseHelpers';
import discussifyApiClient , { getAxiosConfigs } from '@/lib/axios/axiosClient';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { postReplyId: string } }) {
  try {
    const postReplyId = params.postReplyId;
    const config = getAxiosConfigs(request,false);
    const response = await discussifyApiClient.get(`api/v1/post-replies/${postReplyId}/comments`, config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}