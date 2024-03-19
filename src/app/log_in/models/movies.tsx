import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.DB_CONN_STRING!).catch((error) => {
  console.log("Failed to connect to MongoDB:", error);
});

mongoose.Promise = global.Promise;

const ratingsSchema = new Schema({
  imdb: Number,
  metacritic: Number,
});

const movieSchema = new Schema(
  {
    title: String,
    director: String,
    year: Number,
    genre: [String],
    ratings: ratingsSchema,
  },
  {
    bufferTimeoutMS: 250,
    maxTimeMS: 250,
  }
);

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export default Movie;
