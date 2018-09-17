const follow = require("follow"); //https://github.com/iriscouch/follow
const { ZAIN, SUDANI, MTN } = require("./constants");
const messageParser = require("./messageParser");

var colors = require("colors"); // شعرنة

const options = {
  db: "http://127.0.0.1:5984/messages",
  include_docs: true
};

const allowedAddress = [ZAIN];
// const allowedSender = [ZAIN, SUDANI, MTN];

console.log("START WATCHING FOR NEW MESSAGES".yellow);
follow(options, function(error, change) {
  if (error) {
    return;
  }

  const message = change.doc;

  if (!message.address || !message.body) {
    console.log(colors.red("invalid message object"));
    return;
  }

  if (allowedAddress.indexOf(message.address) === -1) {
    console.log(colors.red("not allowed address", message.address));
    return;
  }

  const creditTransferInfo = messageParser(message);
  if (!creditTransferInfo) {
    return;
  }
  console.log(colors.green("CREDIT TRANSFER INFO ##", creditTransferInfo));
});
