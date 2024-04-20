export async function getMongoCollection(collection_name: string) {
  try {
    const res = await fetch(
      "http://localhost:3000/api/mongo/" + collection_name,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
}
