import axios, { AxiosRequestConfig } from 'axios';
import { cookieName, petDiaryApiBaseUrl } from '@/boundary/constants/appConstants';
import { NextRequest } from 'next/server';
import { AccessTokenModel } from '@/boundary/interfaces/token';

const discussifyApiClient = axios.create({
  baseURL: `${petDiaryApiBaseUrl}`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // httpsAgent: new https.Agent({ rejectUnauthorized: false })
});

discussifyApiClient.interceptors.request.use(
  function(config: any) {
    if (
      config.url.includes('journal-entry/create') ||
      config.url.includes('attachment/create') ||
      config.url.includes('pet/profile/edit-picture') ||
      config.url.includes('magic-studio/save-pdf') ||
      config.url.includes('pet/create')
    ) {
      if (config.headers['Content-Type'] == 'application/json' || config.headers['Accept'] == 'application/json') {
        delete config.headers['Content-Type'];
        delete config.headers['Accept'];
      }
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);
export default discussifyApiClient;

export function getAxiosConfigs(request: NextRequest, queryParams?: any) {
  const tokenCookie = request.cookies.get(`${cookieName}`)?.value as string;
  const tokenData: AccessTokenModel = JSON.parse(tokenCookie);
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${tokenData.token.token}`,
    },
    params: queryParams || {},
  };

  return config;
}
