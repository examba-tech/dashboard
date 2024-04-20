import Main from "@/src/components/table/main";

const getMovies = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/mongo/movies", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

const Page = async () => {
  const data = await getMovies();

  const movies = data && data.collection ? data.collection : [];

  return (
    <>
      <Main movies={movies} />
    </>
  );
};

export default Page;
