import ky, { HTTPError } from 'ky';
import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';

import { IUser } from '@/models';

export const POST = async (request: NextRequest) => {
  try {
    const response = ky.post('api/authorization/signup/', {
      prefixUrl: process.env.NEXT_PUBLIC_URL,
      retry: 0,
      json: await request.json()
    });

    const data = await response.json<{ user: Omit<IUser, 'token'>; token: string }>();
    const user = { ...data.user, token: data.user };

    cookies().set({
      name: 'user',
      value: JSON.stringify(user),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7
    });

    return NextResponse.json(user);
  } catch (error) {
    const response = (await (error as HTTPError).response.json()) as { errorMessage: string };
    return NextResponse.json(response.errorMessage, { status: 400 });
  }
};
