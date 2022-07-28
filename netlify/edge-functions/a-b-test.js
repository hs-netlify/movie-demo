export default async (request, context) => {
  const path = context;

  console.log(path);
  console.log("request", request.getHeader("referer"));

  const bucketName = "test_bucket";
  const bucket = context.cookies.get(bucketName);
  const url = context.url;

  if (bucket) {
    const page = await (
      await fetch(`https://${bucket}--next-movie-db.netlify.app/${path}`)
    ).text();

    return new Response(page, { headers: { "content-type": "text/html" } });
  }

  const weighting = 0.5;

  const random = Math.random();
  const newBucketValue = random <= weighting ? "a" : "b";

  context.cookies.set({
    name: bucketName,
    value: newBucketValue,
  });

  const page2 = await (
    await fetch(`https://${newBucketValue}--next-movie-db.netlify.app/${path}`)
  ).text();

  return new Response(page2, { headers: { "content-type": "text/html" } });
};
