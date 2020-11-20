import express from 'express';
import ImageScraper from 'images-scraper';
import { resolve } from 'path';

const google = new ImageScraper({
  puppeteer: {
    headless: true,
  }
});

const app = express();

app.use('/', express.static(resolve(__dirname, '../app')));

app.get('/get-image', (req, res) => {
  console.log("search:" + req.query['searchterm']);
  getImageResult(req.query['searchterm'] as string).then(url => res.send(url));
})

app.listen(1234);

async function getImageResult(str: string) {
    const result = await google.scrape(str, 1);
    const url = result[0].url;
    return url;
}
