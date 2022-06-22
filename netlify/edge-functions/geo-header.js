export default async (request, context) => {
  context.log("Geo header function called: ", JSON.stringify(context.geo));
  const allowList = ["GB"];

  return allowList.includes(context.geo?.country?.code)
    ? context.next()
    : context.rewrite("/access-denied");
};
