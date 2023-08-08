// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model.js")
const Celebrity = require("../models/Celebrity.model.js")
// all your routes here

router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
    .then((AllCelebrities) => {
        res.render("movies/new-movie", { AllCelebrities });
      })
      .catch((err) => console.log(`Err while displaying post input page: ${err}`));
})

router.get("/movies", (req, res, next) => {
    Movie.find()
    .then((allMoviesFromDB) => {
        res.render("movies/movies" , {allMoviesFromDB})
    })
    .catch((err) => console.log(`Err while displaying post input page: ${err}`));
})

router.post('/movies/create', (req, res, next) => {
    console.log(req.body.celebrity)
    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.celebrity 
    }
    Movie.create(newMovie)
        .then((newMovie) => {
            console.log(newMovie)
            res.redirect("/movies")
        })
        .catch((err) => next(err))
});


module.exports = router;