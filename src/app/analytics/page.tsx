import ReactVirtualizedTable from "@/src/components/table/VirtualTable";

const getMovies = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Movies", {
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
  const data_ = await getMovies();

  const movies = data_ && data_.movies ? data_.movies : [];

  return (
    <>
      {/* <div>
        <DenseTable movies={movies} />
      </div>
      <div className="py-8"></div> */}
      <div>
        <ReactVirtualizedTable movies={movies} />
      </div>
      <div className="py-8"></div>
    </>
  );
};

export default Page;








