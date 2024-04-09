import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.DB_CONN_STRING!).catch((error) => {
  console.log("Failed to connect to MongoDB:", error);
});

const timeout = 400;

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
    bufferTimeoutMS: timeout,
    maxTimeMS: timeout,
  }
);
const visitSchema = new Schema(
  {
    date: String,
    visits: Number,
  },
  {
    bufferTimeoutMS: timeout,
    maxTimeMS: timeout,
  }
);

export const Visit =
  mongoose.models.Visit || mongoose.model("Visit", visitSchema);
export const Movie =
  mongoose.models.Movie || mongoose.model("Movie", movieSchema);
