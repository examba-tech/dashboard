import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.DB_CONN_STRING!);
mongoose.Promise = global.Promise;

const ratingsSchema = new Schema({
  imdb: Number,
  metacritic: Number,
});

const movieSchema = new Schema({
  title: String,
  director: String,
  year: Number,
  genre: [String],
  ratings: ratingsSchema,
});

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export default Movie;
