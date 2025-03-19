import dotenv from 'dotenv';
import express from 'express';
import connectionDb from './config/database.js';
import { deleteUrlByCode, redirectUrl, shortUrl } from './controllers/url.controller.js'; // Add .js extension
//import router from './routes/url.routes.js';
dotenv.config();

const app = express(); // Move this line before app.use

app.use(express.urlencoded({ extended: true }));


app.use(express.json());

const PORT = process.env.PORT || 4000;
connectionDb();

app.get('/', (req, res) => {
  res.render('index.ejs', {shortUrl: null});
});
//app.use("/api/v1", router);

app.post('/shorten', shortUrl);
app.post('/delete-url', deleteUrlByCode);

//Dynamic route for original URL
app.get('/:urlCode', redirectUrl);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})

