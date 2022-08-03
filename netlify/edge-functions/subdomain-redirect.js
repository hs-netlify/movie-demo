export default (request, context) => {
  const subdomain = request.url.match(/https:\/\/(.*?)\-\-/);
  const redirected = request.headers.get("x-cloudflare-redirect");
  console.log(request);
  console.log("redirect", redirected);
  if (subdomain && !redirected) {
    console.log(
      "Redirected to Cloudflare - ",
      `https://${subdomain[1]}.netlify-se-demo.com/`
    );
    return Response.redirect(`https://${subdomain[1]}.netlify-se-demo.com/`);
  } else {
    console.log("Request allowed through");
    return await context.next();
  }
};
