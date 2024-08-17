import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = async () => {
  cookies().delete('user');
  return new NextResponse(null, { status: 200 });
};
