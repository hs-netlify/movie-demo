export default async (request, context) => {
  let buckets = JSON.parse(Deno.env.get("AB_TEST_LIST") || "null");

  //If environment variable not set return standard page
  if (!buckets) {
    return context.next();
  }

  //Ensure weighting adds up t//bui
  let totalWeighting = buckets.reduce(
    (tot, bucket) => tot + bucket.weighting,
    0
  );
  let weightingMultiplier = totalWeighting == 1 ? 1 : 1 / totalWeighting;

  //Set the cookie name of the bucket
  const bucketName = "netlify-split-test";

  const requestUrl = new URL(request.url);

  //Only required for next
  if (requestUrl.pathname.startsWith("/_next/images")) {
    return context.next();
  }

  // Get the bucket from the cookie
  let bucket = context.cookies.get(bucketName);
  let hasBucket = !!bucket;

  //Check cookie is active cookie
  if (bucket) {
    const isActiveCookie = buckets.find((b) => b.url == bucket);
    if (!isActiveCookie) {
      hasBucket = false;
    }
  }

  //Assign a bucket if the cookie has not been set
  if (!hasBucket) {
    let randomNumber = Math.random();
    let totalWeighting = 0;
    buckets.forEach((b) => {
      if (
        totalWeighting <= randomNumber &&
        randomNumber <= totalWeighting + b.weighting * weightingMultiplier
      ) {
        bucket = b.url;
        hasBucket = false;
      }
      totalWeighting += b.weighting * weightingMultiplier;
    });
  }

  //Generate full proxy url
  let url = `${bucket}${requestUrl.pathname}`;

  //Set cookie if new bucket has been set
  if (!hasBucket) {
    context.cookies.delete(bucketName);
    context.cookies.set({ name: bucketName, value: bucket });
  }

  let proxyResponse = await fetch(url);
  console.log(proxyResponse);
  if (proxyResponse.status !== 200) {
    return context.next();
  }
  return new Response(proxyResponse.body, proxyResponse);
};
