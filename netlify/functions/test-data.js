import { builder } from "@netlify/functions";
import fetch from "node-fetch";

async function handler(event, context) {
  const data = await (await fetch("https://randomuser.me/api/")).json();
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    ttl: 60,
  };
}

exports.handler = builder(handler);
