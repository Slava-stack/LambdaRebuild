import express from 'express';
import { isValid, getShort, getFull } from './function/functions.js';

const app = express();

app.use(express.urlencoded({ extended: true })) // enables url params
app.use(express.json());

app.post('/createLink', async (req, res) => {
  const { linkToShorten } = req.body;
  if (!isValid(linkToShorten)) {
    res.send('Not valid url string. Please check the the link and send it again.');
  } else {
    const shortenedLink = await getShort(linkToShorten);
    res.send(`Here is your link below:\nlocalhost:5000/getLink/${shortenedLink}`);
  }
});

app.get('/getLink/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;
  const url = await getFull(shortUrl);
  if (url == null) {
    res.send('There is no such link.');
  } else {
    res.redirect(url);  // doesn't work without protocols (ws:\\, https:\\, http:\\, etc.) in ulrs
  }
});

app.listen(5000);
