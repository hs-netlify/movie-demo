export default async (request, context) => {
  //let buckets = JSON.parse(Deno.env.get("AB_TEST_LIST") || "null");

  console.log("env vars", process.env);

  //If environment variable not set return standard page
  if (!buckets) {
    return context.next();
  }

  //Ensure weighting adds up to 1
  let totalWeighting = buckets.reduce(
    (tot, bucket) => tot + bucket.weighting,
    0
  );
  let weightingMultiplier = totalWeighting == 1 ? 1 : 1 / totalWeighting;

  //Set the cookie name of the bucket
  const bucketName = "netlify-split-test";

  const requestUrl = new URL(request.url);

  // Get the bucket from the cookie
  let bucket = context.cookies.get(bucketName);
  let hasBucket = !!bucket;

  //Assign a bucket if the cookie has not been set
  if (!bucket) {
    let randomNumber = Math.random();
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

  //Generate full proxy url
  let url = `${bucket}${requestUrl.pathname}`;

  //Set cookie if new bucket has been set
  if (!hasBucket) {
    context.cookies.set({ name: bucketName, value: bucket });
  }

  let proxyResponse = await fetch(url);
  return new Response(proxyResponse.body, proxyResponse);
};
