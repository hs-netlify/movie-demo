export default (request) => {
  const subdomain = request.url.match(/https:\/\/(.*?)\-\-/);
  const redirected = request.headers.get("x-cloudflare-redirect");
  console.log("redirect", redirected);
  if (subdomain && !redirected) {
    return Response.redirect(`https://${subdomain[1]}.netlify-se-demo.com/`);
  } else {
    return;
  }
};
