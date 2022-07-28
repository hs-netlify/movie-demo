import { NextResponse } from "next/server";

export default function middleware(req) {
  const { pathname } = req.nextUrl;

  const bucketName = "test_bucket";

  // Get the bucket from the cookie
  let bucket = req.cookies.get(bucketName);
  let hasBucket = !!bucket;

  // If there's no active bucket in cookies or its value is invalid, get a new one
  if (!bucket) {
    bucket = Math.random() <= 0.5 ? "a" : "b";
    hasBucket = false;
  }

  // Create a rewrite to the page matching the bucket

  const path = req.nextUrl.pathname;
  let res = NextResponse.rewrite(
    `https://${bucket}--next-movie-db.netlify.app${path}`
  );

  // Add the bucket to the response cookies if it's not there
  // or if its value was invalid
  if (!hasBucket) {
    res.cookies.set(bucketName, bucket);
  }

  console.log("URL", `https://${bucket}--next-movie-db.netlify.app${path}`);

  return res;
}
