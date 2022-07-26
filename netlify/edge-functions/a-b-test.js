export default async (request, context) => {
  // look for existing "test_bucket" cookie
  const bucketName = "test_bucket";
  const bucket = context.cookies.get(bucketName);

  // return here if we find a cookie
  if (bucket) {
    return context.rewrite(`https://${bucket}--next-movie-db.netlify.app`);
  }

  // if no "test_bucket" cookie is found, assign the user to a bucket
  // in this example we're using two buckets (a, b) with an equal weighting of 50/50
  const weighting = 0.5;

  // get a random number between (0-1)
  // this is a basic example and you may want to experiment
  const random = Math.random();
  const newBucketValue = random <= weighting ? "test-a" : "test-b";

  // set the new "test_bucket" cookie
  context.cookies.set({
    name: bucketName,
    value: newBucketValue,
  });

  return context.rewrite(`/$${bucket}`);
};
