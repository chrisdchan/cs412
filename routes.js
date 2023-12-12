const express = require('express');
const router = express.Router();
const request = require('request')

const redis = require('redis');
const redisClient = redis.createClient({});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect()

const createRequestOptions = (req) => {
    const searchTerm = req.body.cocktail
    const url = `https://the-cocktail-db.p.rapidapi.com/search.php?s=${searchTerm}`
    const options = {
        url: url,
        headers: {
            'X-RapidAPI-Key': process.env.COCKTAIL_API_KEY,
            'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
        }
    };
    return options
}

const handleRequestWithPromise = (req, res) => {

    const options = createRequestOptions(req)

    const promise = new Promise((resolve, reject) => {
        request.get(options, (error, response, body) => {
            console.log(response)
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });
    });

    promise
        .then(body => {
            let data = JSON.parse(body)
            const firstThreeDrinks = data['drinks'].slice(0, 3)
            res.render('cocktail', {cocktails: firstThreeDrinks })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err.message });
        });
}

const handleRequestWithCallback = (req, res) => {

    const options = createRequestOptions(req)

    request.get(options, (error, response, body) => {
        if (error) {
            return res.status(500).json({ error: err.message });
        }

        let data;
        try {
            data = JSON.parse(body);
        } catch(parseError) {
            return res.status(500).json({ error: parseError.message })
        }
        const firstThreeDrinks = data['drinks'].slice(0, 3)
        res.render('cocktail', {cocktails: firstThreeDrinks })
    });
}

const handleRequestWithCache = async (req, res) => {

    const searchTerm = req.body.cocktail
    const cacheKey = `search:${searchTerm}`
    const cachedData = await redisClient.get(cacheKey)

    if (cachedData) {
        res.json({cached: true, data: JSON.parse(cachedData)})
    } else {
        const options = createRequestOptions(req)
        request.get(options, (error, response, body) => {
            if (error) {
                return res.status(500).json({ error: err.message });
            }

            let data;
            try {
                data = JSON.parse(body);
            } catch(parseError) {
                return res.status(500).json({ error: parseError.message })
            }
            const firstThreeDrinks = data['drinks'].slice(0, 3)
            redisClient.setEx(cacheKey, 15, JSON.stringify(firstThreeDrinks))
            res.json({cached: false, data: firstThreeDrinks })
        });
    }
}

const handleRequestWithFetch = async (req, res) => {
    const options = createRequestOptions(req)
    const {default: fetch} = await import('node-fetch')
    try {
        const response = await fetch(options.url, options)
        const data = await response.json()
        const firstThreeDrinks = data['drinks'].slice(0, 3)
        res.render('cocktail', {cocktails: firstThreeDrinks })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
}

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/search-cocktail-1', (req, res) => {
    handleRequestWithPromise(req, res)
})

router.post('/search-cocktail-2', (req, res) => {
    handleRequestWithCache(req, res)
})

router.post('/search-cocktail-3', (req, res) => {
    handleRequestWithFetch(req, res)
})

module.exports = router;