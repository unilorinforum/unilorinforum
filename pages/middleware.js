import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import verify from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;


export default function middleware(req) {
  const { cookies } = req;
  const jwt = cookies.get('forumappjwt');
  const url = req.url;
  console.log(jwt);
  

  if (url.includes('/me')) {
    return NextResponse.redirect("/profile");

    // if (1===1) {
    //   return NextResponse.redirect('/login9');
    // }

    try {
      const userData = verify(jwt, secret);
      console.log(userData);
    } catch (error) {}
  }
}
