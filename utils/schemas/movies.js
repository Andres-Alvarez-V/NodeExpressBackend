
const joi = require('joi'); 


// const movieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const movieIdSchema = joi.object({
    movieId: joi.string().regex(/^[0-9a-fA-F]{24}$/)
});


const movieTitleSchema = joi.string().max(80);
const movieYearSchema = joi.number().min(1888).max(2077);
const movieCoverSchema = joi.string().uri();
const movieDescriptionSchema = joi.string().max(300);
const movieDurationSchema = joi.number().min(1).max(300)
const contentRaitingSchema = joi.string();
const sourceSchema = joi.string().uri();
const tagsSchema = joi.array();

const createMoviesSchema = joi.object({
    title: movieTitleSchema.required(),
    year: movieYearSchema.required(),
    cover: movieCoverSchema.required(),
    description: movieDescriptionSchema.required(),
    duration: movieDurationSchema.required(),
    contentRating: contentRaitingSchema.required(),
    source: sourceSchema.required(),
    tags: tagsSchema
});

const updateMoviesSchema = joi.object({
    title: movieTitleSchema,
    year: movieYearSchema,
    cover: movieCoverSchema,
    description: movieDescriptionSchema,
    duration: movieDurationSchema,
    rating: contentRaitingSchema,
    source: sourceSchema,
    tags: tagsSchema
})



module.exports = {
    createMoviesSchema,
    updateMoviesSchema,
    movieIdSchema
}