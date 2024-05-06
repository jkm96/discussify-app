import {NextRequest, NextResponse} from 'next/server';
import {cookieName} from '@/boundary/constants/appConstants';
import {AccessTokenModel} from '@/boundary/interfaces/token';

export async function POST(request: NextRequest) {
  try {
    const tokenRequest = await request.text();

    const response = NextResponse.json(
      {
        'data': '',
        'message': 'Success',
        'statusCode': 200,
      },
      { status: 200 });

    const tokenData: AccessTokenModel = JSON.parse(tokenRequest);
    response.cookies.set({
      name: `${cookieName}`,
      value: tokenRequest,
      httpOnly: true,
      expires: new Date(tokenData.token.expiresAt),
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (e) {
    return NextResponse.json(
      { error: `An error occurred storing cookie: ${e}` }, { status: 400 },
    );
  }
}