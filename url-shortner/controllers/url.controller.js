import shortid from 'shortid';
import Url from '../models/url.model.js';


export const shortUrl = async (req, res) => {

    const longUrl = req.body.longurl;

    const shortCode = shortid.generate();

    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

    const url = new Url({
        urlcode: shortCode,
        longUrl: longUrl,
    })

    await url.save();

    res.render('index.ejs', { shortUrl });
}


export const redirectUrl = async (req, res) => {

    const shortCode = req.params.urlCode;
    const originalUrl = await Url.findOne({ urlcode: shortCode });
    
    if (originalUrl) {
        res.redirect(originalUrl.longUrl);
        await Url.deleteOne({ _id: originalUrl._id });
    } else {
        res.status(404).json('URL not found');
    }


}

export const deleteUrlByCode = async (req, res) => {
    const { urlcode } = req.body;

try {
        const result = await Url.deleteOne({ urlcode });
        if (result.deletedCount > 0) {
            res.redirect('/');
        } else {
            res.status(404).json('URL not found');
        }
    } catch (error) {
        res.status(500).json('Error: ' + error);
    }
};
   