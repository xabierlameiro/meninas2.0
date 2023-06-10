import { fetchGraphQL } from '@helpers/contentful';
import plp from '@queries/plp.graphql';
export const runtime = 'edge';
import Test from '@components/Test';

const getProducts = async () => {
    const { data } = await fetchGraphQL(plp);
    return data.productoCollection.items as ContentfulProduct[];
};

const Home = async () => {
    const data = await getProducts();

    return <Test data={data} />;
};

export default Home;
