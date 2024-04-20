import Main from "@/src/components/table/main";
import { getMongoCollection } from "@/src/utils/get_mongo_collection";

const Page = async () => {
  const data = await getMongoCollection("movies");

  const movies = data && data.collection ? data.collection : [];

  return (
    <>
      <Main movies={movies} />
    </>
  );
};

export default Page;
