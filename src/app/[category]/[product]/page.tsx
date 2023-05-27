import { fetchGraphQL } from '@helpers/graphql';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from '@/components/Cart/Button';

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
    const {
        detail: { sys, nombre, descripcion, precio, portada, stock },
        products,
    } = await getProductBySlug(params.product, params.category);

    const { prevItem, nextItem } = products.reduce(
        (acc: any, item: any, index: number) => {
            if (item.url === params.product) {
                acc.prevItem = products[index - 1]?.url;
                acc.nextItem = products[index + 1]?.url;
            }
            return acc;
        },
        { prevItem: null, nextItem: null }
    );

    return (
        <div>
            {prevItem && <Link href={`/${params.category}/${prevItem}`}>Anterior</Link>}
            {nextItem && <Link href={`/${params.category}/${nextItem}`}>Siguiente</Link>}
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
                    quantity: 1,
                    size: 'M',
                }}
                sizes={stock}
            />
        </div>
    );
}
