import { fetchGraphQL } from '@helpers/graphql';
import Image from 'next/image';
import AddToCartButton from '@/components/Cart/Button';
import NavigationButtons from '@/components/NavigationButtons';

async function getProductBySlug(product: string, category: string) {
    const { data } = await fetchGraphQL(`
    query {
        detail:productoCollection(where: {url: "${product}"}) {
          items {
            sys {
              id
            }
            nombre
            descripcion
            stock
            precio
            url
            categoriaPrincipal {
              slug
            }
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
        products:productoCollection(where:{categorias:{slug:"${category}"}}) {
          items {
            url
          }
        }
      }
    `);
    return {
        detail: data?.detail.items[0],
        products: data?.products.items,
    };
}
export default async function Page({ params }: { params: { product: string; category: string } }) {
    const { product, category } = params;
    const {
        detail: { sys, nombre, descripcion, precio, portada, stock },
        products,
    } = await getProductBySlug(product, category);

    return (
        <div>
            <NavigationButtons listOfProducts={products} productSlug={product} categorySlug={category} />
            <h1>{nombre}</h1>
            <h2>{descripcion}</h2>
            <h3>{precio}</h3>
            <Image src={portada.url} alt={nombre} width={500} height={500} priority={true} />

            <AddToCartButton
                item={{
                    id: sys.id,
                    name: nombre,
                    price: precio,
                    image: portada.url,
                }}
                sizes={stock}
            />
        </div>
    );
}
