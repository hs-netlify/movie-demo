export default async (request, context) => {
  context.log("This is getting called now");
  return context.json({
    geo: context.geo,
    header: request.headers.get("x-nf-geo"),
  });
};
