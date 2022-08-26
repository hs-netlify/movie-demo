import { NextResponse } from "next/server";
import { MiddlewareRequest } from "@netlify/next";

// This function can be marked `async` if using `await` inside
export async function middleware(NextRequest) {
  const test = await (
    await fetch("https://jsonplaceholder.typicode.com/todos/1")
  ).json();

  const request = new MiddlewareRequest(NextRequest);
  const response = await request.next();
  response.setPageProp("titleProp", test.title);
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
