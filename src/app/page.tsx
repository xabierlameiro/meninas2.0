import { fetchGraphQL } from '@helpers/contentful';
import GridContainer from '@components/Layout/GridContainer';
import plp from '@queries/plp.graphql';
import Masonry from '@components/Masonry';

export const runtime = 'edge';

const getProducts = async () => {
    const { data } = await fetchGraphQL(plp);
    return data.productoCollection.items as ContentfulProduct[];
};

const Home = async () => {
    const data = await getProducts();
    return (
        <GridContainer>
            <Masonry data={data} />
        </GridContainer>
    );
};

export default Home;
