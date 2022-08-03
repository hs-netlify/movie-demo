export default (request) => {
  const subdomain = request.url.match(/https:\/\/(.*?)\-\-/);

  if (subdomain) {
    return Response.redirect(`https://${subdomain[1]}.netlify-se-demo.com/`);
  } else {
    return;
  }
};
