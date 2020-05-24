const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=';

function searchMovies(searchTerm){
    return fetch(`${url}${searchTerm}`)
        .then(response => response.text())
        .then(body =>{
            const movies = [];
            const $ = cheerio.load(body);
            $('.findResult').each(function(i, element){
                const $element = $(element);
                const $image = $element.find('td a img');
                const $title = $element.find('td.result_text a');
                //console.log($title,'@@@@@');
                //console.log($element.text());
                //console.log($image.attr('src'));
                const imdbID = $title.attr('href').match(/title\/(.*)\//)[1];
                //console.log($title.attr('href').match(/title\/(.*)\//)[1]);
                //console.log(imdbID);
                const movie = {
                    image: $image.attr('src'),
                    title: $title.text(),
                    imdbID
                };
                movies.push(movie);
            });
            return movies;
        });    
} 

module.exports = {
    searchMovies
};