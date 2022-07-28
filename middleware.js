import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;
  const response = NextResponse.next();
  console.log(path);

  const bucketName = "test_bucket";
  const bucket = request.cookies[bucketName];

  if (bucket) {
    return NextResponse.rewrite(
      new URL(path, `https://${bucket}--next-movie-db.netlify.app/`)
    );
  }

  const weighting = 0.5;

  const random = Math.random();
  const newBucketValue = random <= weighting ? "a" : "b";

  response.cookies.set({
    name: bucketName,
    value: newBucketValue,
  });

  return NextResponse.rewrite(
    new URL(path, `https://${newBucketValue}--next-movie-db.netlify.app/`)
  );
}
