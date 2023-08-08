// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js")
// all your routes here

// router.get()

router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity.hbs')
})

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then(allCelebritiesFromDB => {
        console.log('Retrieved celebrities from DB:', allCelebritiesFromDB);
        res.render('celebrities/celebrities.hbs', { allCelebritiesFromDB });
    })
    .catch(error => {
        console.log('Error while getting the celebrities from the DB: ', error);
        next(error);
    });
})

router.post('/celebrities/create', (req, res, next) => {
    const newCelebtrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    }
    Celebrity.create(newCelebtrity)
        .then((newCelebtrity) => {
            console.log(newCelebtrity)
            res.redirect("/celebrities")
        })
        .catch((err) => next(err))
});

module.exports = router;

