var colors = require("colors"); // شعرنة

const { ZAIN, SUDANI, MTN } = require("./constants");

module.exports = function messageParser(message) {
  switch (message.address) {
    case ZAIN:
      return zainMessagesParser(message);
    case MTN:
      return mtnMessagesParser(message);
    case SUDANI:
      return sudaniMessagesParser(message);
    default:
      throw new Error("Unsupported address " + message.address);
  }
};

function zainMessagesParser(message) {
  console.log("Parsing ZAIN message".yellow);

  const creditTransferRegExp = /You have received [0-9.0-9]+SDG from [0-9]{10}/i;
  const creditTransferRegExpResult = creditTransferRegExp.exec(message.body);
  if (!creditTransferRegExpResult) {
    console.log(
      colors.red(
        "message dont match credit tranfer pattern",
        "\n",
        message.body
      )
    );
    return undefined;
  }

  const receivedAmountRegExp = /[0-9.0-9]+/;
  const receivedAmountResult = receivedAmountRegExp.exec(message.body);
  const amount = Number(receivedAmountResult[0]);

  const senderRegExp = /[0-9]{10}/;
  const senderResult = senderRegExp.exec(message.body);
  const sender = senderResult[0];
  return { sender, amount };
}

function mtnMessagesParser(message) {
  console.log("parsing mtn message");

  throw Error("not yet implemented");
}

function sudaniMessagesParser(message) {
  console.log("parsing sudani message");
  throw Error("not yet implemented");
}
