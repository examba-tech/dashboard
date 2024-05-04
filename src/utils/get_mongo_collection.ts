export async function getMongoCollection(
  collection_name: string,
  params?: { [key: string]: any }
) {
  try {

    let url;
    if (params && Object.keys(params).length !== 0) {
        url = "http://localhost:3000/api/mongo/" + collection_name + "?" + new URLSearchParams(params);
      } else {
        url = "http://localhost:3000/api/mongo/" + collection_name;
      }
      const res = await fetch(url, 
        {
          cache: "force-cache",
        }
      );


    // const res = await fetch(
    //   "http://localhost:3000/api/mongo/" + collection_name + "?" + new URLSearchParams(params),
    //   //"http://localhost:3000/api/mongo/" + collection_name, //+ "?" + new URLSearchParams(params),
      
    //   {
    //     cache: "force-cache",
    //   }
    // );

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    const jsonData = await res.json();

    return jsonData;
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
}
