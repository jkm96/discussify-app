import { NextRequest } from 'next/server';
import { cookieName } from '@/boundary/constants/appConstants';
import { createNextResponse } from '@/helpers/responseHelpers';
import { AccessTokenModel } from '@/boundary/interfaces/token';

export async function POST(request: NextRequest) {
  try {
    const tokenCookie = request.cookies.get(`${cookieName}`)?.value as string;
    if (tokenCookie === undefined) {
      return createNextResponse(404, 'Cookie was empty');
    }

    const tokenData: AccessTokenModel = JSON.parse(tokenCookie);
    const expirationDate = new Date(tokenData.token.expiresAt);
    const currentDate = new Date();
    if (expirationDate > currentDate) {
      return createNextResponse(200, 'Success', tokenCookie);
    }

    return createNextResponse(400, 'Session expired. Please login');

  } catch (e) {
    return createNextResponse(400, `An error occurred getting cookie: ${e}`);
  }
}