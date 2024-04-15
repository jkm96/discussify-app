import { NextResponse } from 'next/server';
import { AxiosError, AxiosResponse } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { ApiErrorResponse } from '@/boundary/interfaces/shared';

export function handleAxiosResponse(response: AxiosResponse<any>) {
  const axiosResponse = response.data;
  if (axiosResponse.statusCode === 200) {
    // console.log("api response", axiosResponse)
    return createNextResponse(200, axiosResponse.message, axiosResponse.data);
  } else {
    return createNextResponse(axiosResponse.statusCode, axiosResponse.message,axiosResponse.data);
  }
}

export function handleApiException(error: any) {
  if (error instanceof AxiosError) {
    // Handle Axios errors
    const axiosError = error as AxiosError;
    if (axiosError.response !== undefined) {
      console.error('error response data', axiosError.response?.data);
      console.error('error response status', axiosError.response?.status);
      const errorData: any = axiosError.response?.data;
      const errorResponse = camelcaseKeys(errorData, { deep: true }) as ApiErrorResponse;
      if (axiosError.response?.data) {
        const errData = axiosError.response?.data as ApiErrorResponse;
        return createNextResponse(errData.statusCode, errData.message);
      }
      return createNextResponse(axiosError.response?.status ?? 500, axiosError.response.statusText ?? errorResponse.message, errorResponse);
    }

    switch (axiosError.code) {
      case 'ECONNREFUSED':
        return createNextResponse(503, 'Unable to connect to the server. Please try again later.');
    }
  }
  console.error('error', error);
  return createNextResponse(500, 'An unhandled error occurred. Please try again later.', { 'error': error });
}

export function createNextResponse(statusCode: number, message: string, data = {}) {
  return NextResponse.json({
    message,
    statusCode,
    data,
  });
}