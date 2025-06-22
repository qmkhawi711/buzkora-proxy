
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/stream", async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).send("URL is required");
    }

    const response = await axios.get(url, {
      headers: {
        Referer: "https://pl.buzkora.online/albaplayer/1bein1/?serv=2",
        Origin: "https://pl.buzkora.online",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36",
      },
      responseType: "stream",
    });

    res.set({
      "Content-Type": response.headers["content-type"] || "application/vnd.apple.mpegurl",
    });

    response.data.pipe(res);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
