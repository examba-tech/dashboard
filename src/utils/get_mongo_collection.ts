export async function getMongoCollection(collection_name: string) {
  try {
    const res = await fetch(
      "http://localhost:3000/api/mongo/" + collection_name,
      {
        cache: "force-cache",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    const jsonData = await res.json();

    return jsonData;
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
}
