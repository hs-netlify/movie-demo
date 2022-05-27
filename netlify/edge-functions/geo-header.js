export default async (request, context) => {
  context.log("Geo header function called: ", JSON.stringify(context.geo));
  return context.json({
    geo: context.geo,
    header: request.headers.get("x-nf-geo"),
  });
};
