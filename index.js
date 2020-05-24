const express =require('express');
const scraper =require('./scraper');
const app = express();

app.get('/', (req,res)=> {
    res.json({
        message: 'cutting'
    });
});

// /search/moviename
app.get('/search/:title', (req,res)=> {
    scraper.searchMovies(req.params.title)
    .then(movies => {
        res.json(movies);
    });
});
 
const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`Listening on ${port}`);
});