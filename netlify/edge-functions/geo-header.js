export default async (request, context) => {
  const allowList = ["GB"];

  // Uses https://www.ipqualityscore.com/documentation/proxy-detection/overview

  const geoCode = context.geo?.country?.code;

  const ipCheck = await (
    await fetch(
      `https://ipqualityscore.com/api/json/ip/abvO9dUu9Ej84y2TOG0UpWwHJtYfwnFI/${context.ip}?strictness=1&allow_public_access_points=true`
    )
  ).json();

  const correctGeo = allowList.includes(geoCode);
  const lowFraudScore = ipCheck.fraud_score < 50;

  if (correctGeo && lowFraudScore) {
    context.log(
      `Access Granted - IP Address ${context.ip} is allowed from ${geoCode}.Fraud score = ${ipCheck.fraud_score}`
    );
    return context.next();
  } else {
    !correctGeo
      ? context.log(
          `Access Denied - Accessing site from blocked location: ${geoCode}`
        )
      : "";
    !lowFraudScore
      ? context.log(
          `Access Denied - Accessing site from IP with high fraud score (${ipCheck.fraud_score}), suspected VPN`
        )
      : "";
    return context.rewrite("/access-denied");
  }
};
