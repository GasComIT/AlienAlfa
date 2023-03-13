const { command, sleep, isPrivate } = require("../lib/");

command({
    pattern: "getqr ?(.*)",
    fromMe: isPrivate,
    desc: "Get connection QR",
    type: "tool",
  }, async (message, match, m) => {
    message.treply("```Processing QR```")
    for (let index = 0; index < 5; index++) {
      await sleep(30 * 1000);
      await message.sendFromUrl("https://cheeryfinedesign.alien-alfa.repl.co", {
        caption: "Scan within 30 seconds",
      });
    }
    return await message.treply("Your session is OVER");
  }
);

  