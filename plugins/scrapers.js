const { command, isPrivate, scraper, getJson, isUrl } = require("../lib");
const {
  news_24,
  news_manorama,
  news_mathrubhumi,
  news_bbc,
  news_asianet,
  news_toi,
} = scraper;



command({
    pattern: "news",
    fromMe: isPrivate,
    desc: "Get News",
    type: "search",
  },
  async (message, match,m, client) => {
    let {prefix} = message
    if (!match) {
      await client.sendMessage(message.jid, {
        text: `Pick a News Provider`,
        buttonText: "View Provider",
        sections: [
          {
            title: `Malayalam News Scrapper`,
            rows: [
              {
                title: `24 News`,
                rowId: `${global.prefix}news 24`,
              },
              {
                title: `Asianet news`,
                rowId: `${global.prefix}news asianet`,
              },
              {
                title: `Manorama news`,
                rowId: `${global.prefix}news manorama`,
              },
              {
                title: `Mathrubhumi news`,
                rowId: `${global.prefix}news mathrubhumi`,
              },
            ],
          },
          {
            title: `English`,
            rows: [
              {
                title: `BBC News`,
                rowId: `${global.prefix}news BBC`,
              },
              {
                title: `Times Of India`,
                rowId: `${global.prefix}news toi`,
              },
            ],
          },
        ],
      });
    } else if (match === "24") {
      let rows = [];
      let news = await news_24();
      for (let i of news) {
        rows.push({
          title: i.header,
          description: `LINK : ${i.url}`,
          rowId: `  `,
        });
      }
      await client.sendMessage(message.jid, {
        text: `News From 24 News`,
        buttonText: "read news",
        sections: [
          {
            title: `Malayalam News Scrapper`,
            rows: rows,
          },
        ],
      });
    } else if (match === "toi") {
      let rows = [];
      let news = await news_toi();
      for (let i of news) {
        rows.push({
          title: i.header,
          description: `LINK : ${i.url}`,
          rowId: `  `,
        });
      }
      await client.sendMessage(message.jid, {
        text: `News From Times Of India`,
        buttonText: "read news",
        sections: [
          {
            title: `Malayalam News Scrapper`,
            rows: rows,
          },
        ],
      });
    } else if (match === "manorama") {
      let rows = [];
      let news = await news_manorama();
      for (let i of news) {
        rows.push({
          title: i.header,
          description: `LINK : ${i.url}`,
          rowId: `  `,
        });
      }
      await client.sendMessage(message.jid, {
        text: `News From Manorama News`,
        buttonText: "read news",
        sections: [
          {
            title: `Malayalam News Scrapper`,
            rows: rows,
          },
        ],
      });
    } else if (match === "asianet") {
      let rows = [];
      let news = await news_asianet();
      for (let i of news) {
        rows.push({
          title: i.header,
          description: `LINK : ${i.url}`,
          rowId: `  `,
        });
      }
      await client.sendMessage(message.jid, {
        text: `News From Asianet News`,
        buttonText: "read news",
        sections: [
          {
            title: `Malayalam News Scrapper`,
            rows: rows,
          },
        ],
      });
    } else if (match === "mathrubhumi") {
      let rows = [];
      let news = await news_mathrubhumi();
      for (let i of news) {
        rows.push({
          title: i.header,
          description: `LINK : ${i.url}`,
          rowId: `  `,
        });
      }
      await client.sendMessage(message.jid, {
        text: `News From Mathrubhumi News`,
        buttonText: "read news",
        sections: [
          {
            title: `Malayalam News Scrapper`,
            rows: rows,
          },
        ],
      });
    } else if (match === "BBC") {
      let rows = [];
      let news = await news_bbc();
      for (let i of news) {
        rows.push({
          title: i.header,
          description: `LINK : ${i.url}`,
          rowId: `  `,
        });
      }
      await client.sendMessage(message.jid, {
        text: `News From BBC News`,
        buttonText: "read news",
        sections: [
          {
            title: `BBC news`,
            rows: rows,
          },
        ],
      });
    }
  }
);



command({
    pattern: "movie",
    fromMe: true,
    desc: "Movie info",
    type: "search",
  }, async (message, match, m) => {
    const movie = await getJson(
      `http://www.omdbapi.com/?apikey=742b2d09&t=${match}&plot=full`
    );

    if (movie.Response !== "True") return await message.treply("*Not found*");
    let msg = "";
    const url = movie.Poster;
    delete movie.Poster;
    delete movie.Response;
    delete movie.Ratings;
    for (const data in movie)
      if (movie[data] != "N/A") msg += `*${data} :* ${movie[data]}\n`;
    if (url == "N/A") return await message.sendMessage(msg.trim());
    return await message.sendMessage(url, { caption: msg.trim() }, "image");
  }
);





