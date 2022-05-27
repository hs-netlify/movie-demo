export default async (request, context) => {
  context.log("Geo header function called: ", JSON.stringify(geo));
  return context.json({
    geo: context.geo,
    header: request.headers.get("x-nf-geo"),
  });
};
