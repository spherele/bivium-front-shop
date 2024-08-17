import ky, { HTTPError } from 'ky';
import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';

import { IUser } from '@/models';

export const PATCH = async (request: NextRequest) => {
  if (!cookies().has('user')) {
    return new NextResponse(null, { status: 401 });
  }

  try {
    const payload = await request.json();
    const user = JSON.stringify({ ...JSON.parse(cookies().get('user')!.value), ...payload });

    await ky.patch('api/user/', {
      prefixUrl: process.env.NEXT_PUBLIC_URL,
      retry: 0,
      json: payload,
      headers: {
        Authorization: `Bearer ${(JSON.parse(cookies().get('user')!.value) as IUser).token}`
      }
    });

    cookies().set({
      name: 'user',
      value: user,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    const response = (await (error as HTTPError).response.json()) as { errorMessage: string };
    return NextResponse.json(response.errorMessage, { status: 400 });
  }
};
