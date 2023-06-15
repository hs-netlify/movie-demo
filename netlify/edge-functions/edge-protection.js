import ipRangeCheck from "https://jspm.dev/ip-range-check";

export default async (request, context) => {
  //Import allow lists from Env variables
  const ipAllowList = JSON.parse(Deno.env.get("IP_ALLOW_LIST") || "null");
  const ip = context.ip;

  console.log(ipAllowList);

  //console.log(ipRangeCheck(ip, ipAllowList));

  const correctIp = ipAllowList ? ipAllowList.includes(ip) : true;

  //Allows/Denies Access and rewrites to respective pages.
  if (correctIp) {
    context.log(`Access Granted - IP Address ${ip} is allowed`);
    return context.next();
  } else {
    !correctIp && ipAllowList
      ? context.log(`Access Denied -${errors.toString()}`)
      : "";

    return context.rewrite("/access-denied");
  }
};
