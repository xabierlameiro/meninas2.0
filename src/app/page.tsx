async function fetchGraphQL(query: string, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_TOKEN}`,
      },
      body: JSON.stringify({ query: query }),
    }
  ).then((response) => response.json())
  .catch((error) => {
    throw new Error(error);
  });
}

async function getItems() {
   const {data} = await fetchGraphQL(`
          query {
            productoCollection {
              items {
                nombre
                descripcion
                precio
                url
                portada {
                  url
                }
                categoriasCollection {
                  items {
                    nombre
                  }
                }
              }
            }
          }
        `)
        return data

  }

export default async function Home() {
  const data = await getItems()
  return (
   <h1>{JSON.stringify(data)}</h1>
  )
}

