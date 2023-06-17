import { fetchGraphQL } from '@helpers/contentful';
import plp from '@queries/plp.graphql';
import Masonry from '@components/Masonry';
import { ProductsScheme } from '@schemes/product';

const getProducts = async () => {
    const { data } = await fetchGraphQL(plp, { skip: 0, limit: 100 });
    return {
        products: ProductsScheme.parse(data.productoCollection.items),
    };
};

const Home = async () => {
    const { products } = await getProducts();
    return <Masonry data={products} />;
};

export default Home;
