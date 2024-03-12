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
  console.log(data);
  // Make sure we have tickets needed for production build.
  const text = data?.movies ? "Connection to MongoDB succesfull." : "Error.";

  return (
    <div className="text-black">
      {" "}
      <p>{text}</p>{" "}
    </div>
  );
};

export default Page;
