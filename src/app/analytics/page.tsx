import DenseTable from "@/src/components/table/table";

const getMovies = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Movies", {
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
  
  const movies = data.movies ? data.movies : [];

  return (
    <>
      <div>
        <DenseTable movies={movies} />
      </div>
    </>
  );
};

export default Page;
