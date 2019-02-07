// Github keys
exports.github = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET
};
//Slack keys
exports.slack = {
  signingSecret: process.env.MY_SLACK_SIGNING_SECRET,
  slackBotToken: process.env.SLACK_BOT_TOKEN
};

exports.githubCallbackUrl = {
  callbackUrl: process.env.GITHUB_CALLBACK_URL
};
