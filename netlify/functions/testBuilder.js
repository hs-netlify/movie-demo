const { builder } = require("@netlify/functions");

async function handler(event, context) {
  let body = JSON.parse(event.body);

  let response =
    process.env.ODB_AUTH === body.token
      ? `Allowed - ${Date.now()}`
      : `Denied - ${Date.now()}`;
  return {
    statusCode: 200,
    body: response,
    TTL: 60,
  };
}
exports.handler = builder(handler);
