import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;

  console.log(path);

  const bucketName = "test_bucket";
  const bucket = request.cookies.get(bucketName);
  console.log("bucket", bucket);

  if (bucket) {
    return NextResponse.rewrite(
      new URL(path, `https://${bucket}--next-movie-db.netlify.app/`)
    );
  } else {
    const weighting = 0.5;

    const random = Math.random();
    const newBucketValue = random <= weighting ? "a" : "b";

    let response = NextResponse.rewrite(
      new URL(path, `https://${newBucketValue}--next-movie-db.netlify.app/`)
    );
    response.cookies.set(bucketName, newBucketValue);
    console.log("Response", response);

    return response;
  }
}
