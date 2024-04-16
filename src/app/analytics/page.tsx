import ReactVirtualizedTable from "@/src/components/table/VirtualTable";
import Filters from "@/src/components/filters/Main";

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

  const movies = data && data.movies ? data.movies : [];

  return (
    <>
      {/* <div>
        <DenseTable movies={movies} />
      </div>
      <div className="py-8"></div> */}
      <Filters />
      <div className="py-8" />
      <ReactVirtualizedTable movies={movies} />
      <div className="py-8"></div>
    </>
  );
};

export default Page;
