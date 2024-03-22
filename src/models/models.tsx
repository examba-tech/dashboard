import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.DB_CONN_STRING!).catch((error) => {
  console.log("Failed to connect to MongoDB:", error);
});

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
const visitSchema = new Schema(
  {
    date: String,
    visits: Number,
  },
  {
    bufferTimeoutMS: 250,
    maxTimeMS: 250,
  }
);

export const Visit = mongoose.models.Visit || mongoose.model("Visit", visitSchema);
export const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);
