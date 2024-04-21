import axios, { AxiosRequestConfig } from 'axios';
import { cookieName, discussifyApiUrl } from '@/boundary/constants/appConstants';
import { NextRequest } from 'next/server';
import { AccessTokenModel } from '@/boundary/interfaces/token';

const discussifyApiClient = axios.create({
  baseURL: `${discussifyApiUrl}`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // httpsAgent: new https.Agent({ rejectUnauthorized: false })
});

discussifyApiClient.interceptors.request.use(
  function(config: any) {
    //do customizations here
      return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);
export default discussifyApiClient;

export function getAxiosConfigs(request: NextRequest, isAuthenticated: boolean, queryParams?: any): AxiosRequestConfig {
  const config: AxiosRequestConfig = {
    params: queryParams || {},
  };

  if (isAuthenticated) {
    const tokenCookie = request.cookies.get(`${cookieName}`)?.value as string;
    const tokenData: AccessTokenModel = JSON.parse(tokenCookie);
    config.headers = {
      Authorization: `Bearer ${tokenData.token.token}`,
    };
  }

  return config;
}
