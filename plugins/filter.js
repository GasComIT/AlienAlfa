const {
  getFilter,
  setFilter,
  deleteFilter,
  toggleFilter,
} = require("../lib/database/filters");
const { command, isPrivate, tiny } = require("../lib");

const Lang = {
  FILTER_DESC:
    "It adds a filter. If someone writes your filter, it send the answer. If you just write .filter, it show's your filter list.",
  NO_FILTER: "*❌ There are no filters in this chat!*",
  FILTERS: tiny("your filters for this chat"),
  NEED_REPLY: "*❌ Please type in reply!*\n*Example:*",
  FILTERED: "*✅ Successfully set* ```{}``` *to filter!*",
  STOP_DESC: "Stops the filter you added previously.",
  NEED_FILTER: "*❌ Please type a filter!*\n*Example:*",
  ALREADY_NO_FILTER: "*❌ There is already no filter like this!*",
  DELETED: "*✅ The filter was successfully deleted!*",
};

command({
    pattern: "filter ?(.*)",
    fromMe: true,
    desc: Lang.FILTER_DESC,
    usage: ".filter keyword:message",
    type: "group",
  }, async (message, match, m) => {
    let { prefix } = message;
    let text, msg;
    try {
      [text, msg] = match.split(":");
    } catch {}
    if (!match) {
      filtreler = await getFilter(message.jid);
      if (filtreler === false) {
        await message.treply(Lang.NO_FILTER);
      } else {
        var mesaj = Lang.FILTERS + "\n\n";
        filtreler.map(
          (filter) => (mesaj += `✒ ${filter.dataValues.pattern}\n`)
        );
        mesaj += tiny("use : .filter keyword:message\nto set a filter");
        await message.treply(mesaj);
      }
    } else if (!text || !msg) {
      return await message.treply(
        "```use : .filter keyword:message\nto set a filter```"
      );
    } else {
      await setFilter(message.jid, text, msg, true);
      return await message.treply(`_Sucessfully set filter for ${text}_`);
    }
  }
);

command({
    pattern: "stop ?(.*)",
    fromMe: true,
    desc: Lang.STOP_DESC,
    usage: '.stop "hello"',
    type: "group",
  }, async (message, match, m) => {
    if (!match) return await message.treply("\n*Example:* ```.stop hello```");

    del = await deleteFilter(message.jid, match);

    if (!del) {
      await message.treply(Lang.ALREADY_NO_FILTER);
    } else {
      await message.treply(`_Filter ${match} deleted_`);
    }
  }
);

command({ on: "text", fromMe: isPrivate }, async (message, match, m) => {
  var filtreler = await getFilter(message.jid);
  if (!filtreler) return;
  filtreler.map(async (filter) => {
    pattern = new RegExp(
      filter.dataValues.regex
        ? filter.dataValues.pattern
        : "\\b(" + filter.dataValues.pattern + ")\\b",
      "gm"
    );
    if (pattern.test(match)) {
      await message.treply(filter.dataValues.text, {
        quoted: message,
      });
    }
  });
});
