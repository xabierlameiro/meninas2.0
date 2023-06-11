import { fetchGraphQL } from '@helpers/contentful';
import GridContainer from '@components/Layout/GridContainer';
import plp from '@queries/plp.graphql';
import dynamic from 'next/dynamic';

const Masonry = dynamic(() => import('@components/Masonry'), { ssr: false });

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
