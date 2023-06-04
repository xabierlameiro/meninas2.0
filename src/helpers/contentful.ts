export const fetchGraphQL = async (query: string, variables?: Record<string, unknown>) => {
    const res = await fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_CONTENTFUL_SPACE_ID}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_CONTENTFUL_TOKEN}`,
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        }
    );

    if (!res.ok) {
        throw new Error(`Something went wrong with GraphQL. ${res.status} ${res.statusText}`);
    }

    return await res.json();
};
