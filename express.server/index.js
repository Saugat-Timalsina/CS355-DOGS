const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

const dogBreeds = {
    labrador: ['labrador1.jpg', 'labrador2.jpg'],
    beagle: ['beagle1.jpg', 'beagle2.jpg'],
    bulldog: ['bulldog1.jpg', 'bulldog2.jpg']
};

const randInt = n => Math.floor(n * Math.random());
const getRandomItemFromArray = arr => arr[randInt(arr.length)];

app.get('/breeds', (req, res) => {
    res.json(Object.keys(dogBreeds));
});

app.get('/image/:breed', (req, res) => {
    const breed = req.params.breed.toLowerCase();
    if (dogBreeds[breed]) {
        const image = getRandomItemFromArray(dogBreeds[breed]);
        res.json({ image: `/img/${image}` });
    } else {
        res.status(404).json({ error: 'Breed not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
