export default async (request, context) => {
  let buckets = JSON.parse(Deno.env.get("AB_TEST_LIST") || "null");

  if (!buckets) {
    return context.next();
  }

  let totalWeighting = buckets.reduce(
    (tot, bucket) => tot + bucket.weighting,
    0
  );

  let weightingMultiplier = totalWeighting == 1 ? 1 : 1 / totalWeighting;

  const bucketName = "ab-bucket";

  const requestUrl = new URL(request.url);

  // Get the bucket from the cookie
  let bucket = context.cookies.get(bucketName);
  let hasBucket = !!bucket;

  let randomNumber = Math.random();

  if (!bucket) {
    let totalWeighting = 0;
    buckets.forEach((b) => {
      if (
        totalWeighting <= randomNumber &&
        randomNumber <= totalWeighting + b.weighting * weightingMultiplier
      ) {
        bucket = b.url;
        console.log(bucket);
        hasBucket = false;
      }
      totalWeighting += b.weighting * weightingMultiplier;
    });
  }

  let url = `${bucket}${requestUrl.pathname}`;

  if (!hasBucket) {
    context.cookies.set({ name: bucketName, value: bucket });
  }

  let proxyResponse = await fetch(url);

  return new Response(proxyResponse.body, proxyResponse);
};
