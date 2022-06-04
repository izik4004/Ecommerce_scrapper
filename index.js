const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = 'f3c08ed277fe83eaf35bd98e56f384f9'
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('welcome to my tool scrapper');
});


// Get product details
app.get('/products/:productId', async (req, res) => {
    const { productId} = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);
        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error)
    }
});


//Get product reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId} = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error)
    }
});
app.listen(PORT, () => console.log(`server running on port ${PORT}`));