import MasterTable from "@/src/components/tables/master_table/main";
import { getMongoCollection } from "@/src/utils/get_mongo_collection";

const Page = async () => {
  const data = await getMongoCollection("master");

  const master = data && data.collection ? data.collection : [];

  return (
    <>
      <MasterTable data={master} />
    </>
  );
};

export default Page;
