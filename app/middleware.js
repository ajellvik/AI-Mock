import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.redirect('/sign-in'); // Redirect to sign-in if not authenticated
  }

  const user = await clerk.users.getUser(userId);

  if (!user.publicMetadata.isSubscribed) {
    return NextResponse.redirect('/upgrade'); // Redirect to upgrade if not subscribed
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // Apply the middleware to the dashboard path
};
