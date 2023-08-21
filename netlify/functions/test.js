exports.handler = async (event) => {
  let test = process.env.DEPLOY_URL;
  test = test ? test : "Not working";
  return { statusCode: 200, body: JSON.stringify(test) };
};
