import ipRangeCheck from "https://jspm.dev/ip-range-check";

export default async (request, context) => {
  //Import allow lists from Env variables
  const ipAllowList = JSON.parse(Deno.env.get("IP_ALLOW_LIST") || "null");
  const ip = context.ip;

  const correctIp = ipAllowList ? ipRangeCheck(ip, ipAllowList) : true;

  //Allows/Denies Access based off IP. Returns accessed denied if outside of range
  if (correctIp) {
    context.log(`Access Granted - IP Address ${ip} is allowed`);
    return context.next();
  } else {
    !correctIp && ipAllowList
      ? context.log(`Access Denied - IP Address ${ip} is not allowed`)
      : "";

    return new Response("access-denied", context.next());
  }
};
