export default async (request, context) => {
  //Import allow lists from Env variables
  const geoAllowList = JSON.parse(Deno.env.get("GEO_ALLOW_LIST") || "null");
  const ipAllowList = JSON.parse(Deno.env.get("IP_ALLOW_LIST") || "null");

  //Fetch geo code and IP from incoming request
  const geoCode = context.geo?.country?.code;
  const ip = context.ip;

  // Uses https://www.ipqualityscore.com/documentation/proxy-detection/overview to check for VPN and BOT traffic.
  const ipCheck = await (
    await fetch(
      `https://ipqualityscore.com/api/json/ip/abvO9dUu9Ej84y2TOG0UpWwHJtYfwnFI/${ip}?strictness=1&allow_public_access_points=true`
    )
  ).json();

  //Complete checks against lists and fraud score
  const correctGeo = geoAllowList ? geoAllowList.includes(geoCode) : true;
  const correctIp = ipAllowList ? ipAllowList.includes(ip) : true;
  const lowFraudScore = ipCheck.fraud_score < 50;

  //Allows/Denies Access and rewrites to respective pages.
  if (correctGeo && lowFraudScore && correctIp) {
    context.log(
      `Access Granted - IP Address ${ip} is allowed from ${geoCode}.Fraud score = ${ipCheck.fraud_score}`
    );
    return context.next();
  } else {
    let errors = [];
    !correctGeo && geoAllowList
      ? errors.push(` Accessing site from blocked location: ${geoCode}`)
      : "";
    !correctIp && ipAllowList
      ? errors.push(` IP address not on allowed list: ${ip}`)
      : "";
    !lowFraudScore
      ? errors.push(
          ` Accessing site from IP with high fraud score (${ipCheck.fraud_score}), suspected VPN`
        )
      : "";
    context.log(`Access Denied -${errors.toString()}`);
    return context.rewrite("/access-denied");
  }
};
