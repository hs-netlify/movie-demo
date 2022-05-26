export default async (request, context) => {
  console.log("this has been called ok");
  return context.json({
    geo: context.geo,
    header: request.headers.get("x-nf-geo"),
  });
};
