const express = require('express');
const MovieService = require('../services/movies');

const {
    movieIdSchema,
    createMoviesSchema,
    updateMoviesSchema
} = require('../utils/schemas/movies');



const validationHandler = require('../utils/middleware/validationHandler');

const cacheResponse =  require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTS_IN_SECONDS} = require('../utils/time');

function moviesApi(app){
    const router = express.Router();
    app.use('/api/movies', router);

    const moviesService = new MovieService();

    router.get('/', async (req, res, next) => {

        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { tags } = req.query;
        

        try{
            const movies = await moviesService.getMovies({ tags });
            // throw new Error('Error getting movies');
            res.status(200).json({
                data: movies,
                message: 'Movies listed'
            })

        }catch(err){
            next(err);
        }
    }); 
    router.get('/:movieId', validationHandler(movieIdSchema, 'params'), async (req, res, next) => {
        
        cacheResponse(res, SIXTY_MINUTS_IN_SECONDS);
        const { movieId } = req.params;

        try{
            const movies = await moviesService.getMovie({ movieId });
            res.status(200).json({
                data: movies,
                message: 'Movie retrived'
            })

        }catch(err){
            next(err);
        }
    })

    router.post('/', validationHandler(createMoviesSchema), async (req, res, next) => {

        const { body: movie} = req;

        try{
            const createMovieId = await moviesService.createMovie({ movie });
            res.status(201).json({
                data: createMovieId,
                message: 'Movie created'
            })

        }catch(err){
            next(err);
        }
    })

        router.put('/:movieId', validationHandler( movieIdSchema, 'params'), validationHandler(updateMoviesSchema), async (req, res, next) => {

        const { body: movie} = req;
        const { movieId } = req.params;
        console.log(req)
        try{
            const updateMovieId = await moviesService.updateMovie({ movieId, movie});
            res.status(200).json({
                data: updateMovieId,
                message: 'Movie uptaded'
            })

        }catch(err){
            next(err);
        }
    });

    router.patch('/:movieId', async(req, res, next) => {
        const { body: movieItem} = req.body;
        const { movieId } = req.params;

        try{
            const patchedMovieId = await moviesService.patchMovie({ movieId, movieItem });
            res.status(200).json({
                data: patchedMovieId,
                message: 'Movie patched'
            })

        }catch(err){
            next(err);
        }        
    })

    router.delete('/:movieId', validationHandler( movieIdSchema, 'params'), async (req, res, next) => {

        const { movieId } = req.params;

        try{
            const deletedMovieId = await moviesService.deleteMovie({ movieId })
            res.status(200).json({
                data: deletedMovieId,
                message: 'Movie deleted'
            })

        }catch(err){
            next(err);
        }
    })
}

module.exports = moviesApi;