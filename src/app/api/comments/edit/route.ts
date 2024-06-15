import {handleApiException, handleAxiosResponse} from '@/helpers/responseHelpers';
import {NextRequest} from 'next/server';
import discussifyApiClient, {getAxiosConfigs} from "@/lib/axios/axiosClient";
import {EditCommentRequest} from "@/boundary/interfaces/comment";

export async function POST(request: NextRequest) {
  try {
    const requestBody: EditCommentRequest = await request.json() as EditCommentRequest;
    const commentId = requestBody.commentId;
    const config = getAxiosConfigs(request, true);
    const response = await discussifyApiClient.put(`api/v1/post-replies/comments/${commentId}/edit`,requestBody, config);

    return handleAxiosResponse(response);
  } catch (error: unknown) {
    return handleApiException(error);
  }
}