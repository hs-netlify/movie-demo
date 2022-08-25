import { NextResponse } from "next/server";
import { MiddlewareRequest } from "@netlify/next";

// This function can be marked `async` if using `await` inside
export async function middleware(NextRequest) {
  const request = new MiddlewareRequest(NextRequest);
  const response = await request.next();
  response.setPageProp("title", "WOW A NEW TITLE!");
  console.log("Gets here");
  console.log(response);
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
