export default async (request, context) => {
  context.log("Geo header function called: ", JSON.stringify(context.geo));
  const allowList = ["GB"];

  // Uses https://www.ipqualityscore.com/documentation/proxy-detection/overview

  const geoCode = context.geo?.country?.code;

  const ipCheck = await (
    await fetch(
      `https://ipqualityscore.com/api/json/ip/abvO9dUu9Ej84y2TOG0UpWwHJtYfwnFI/${context.ip}?strictness=1&allow_public_access_points=true`
    )
  ).json();

  context.log("IP check", context.ip);
  return allowList.includes(geoCode) && ipCheck.fraud_score < 50
    ? context.next()
    : context.rewrite("/access-denied");
};
