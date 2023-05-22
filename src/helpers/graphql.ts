export async function fetchGraphQL(query: string, preview = false) {
    return fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CONTENTFUL_TOKEN}`,
        },
        body: JSON.stringify({ query }),
      }
    ).then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });
  }