var crypto = require("crypto");
var qs = require("qs");
var keys = require("../config/keys.js");
// fetch this from environment variables
var slackSigningSecret = keys.slack.signingSecret; //process.env.MY_SLACK_SIGNING_SECRET;
var signVerification = function(req, res, next) {
  var slackSignature = req.headers["x-slack-signature"];
  var requestBody = qs.stringify(req.body, { format: "RFC1738" });
  var timestamp = req.headers["x-slack-request-timestamp"];
  var time = Math.floor(new Date().getTime() / 1000);
  if (Math.abs(time - timestamp) > 300) {
    return res.status(400).send("Ignore this request.");
  }
  if (!slackSigningSecret) {
    return res.status(400).send("Slack signing secret is empty.");
  }
  var sigBasestring = "v0:" + timestamp + ":" + requestBody;
  var mySignature =
    "v0=" +
    crypto
      .createHmac("sha256", slackSigningSecret)
      .update(sigBasestring, "utf8")
      .digest("hex");
  if (
    crypto.timingSafeEqual(
      Buffer.from(mySignature, "utf8"),
      Buffer.from(slackSignature, "utf8")
    )
  ) {
    next();
  } else {
    return res.status(400).send("Verification failed");
  }
};
module.exports = signVerification;
