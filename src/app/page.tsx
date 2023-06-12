import { fetchGraphQL } from '@helpers/contentful';
import plp from '@queries/plp.graphql';
import Masonry from '@components/Masonry';

const getProducts = async () => {
    const { data } = await fetchGraphQL(plp);
    return data.productoCollection.items as ContentfulProduct[];
};

const Home = async () => {
    const data = await getProducts();
    return <Masonry data={data} />;
};

export default Home;
