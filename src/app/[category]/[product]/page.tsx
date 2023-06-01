import { fetchGraphQL } from '@/helpers/contentful';
import Image from 'next/image';
import AddToCartButton from '@/components/Cart/Button';
import NavigationButtons from '@/components/NavigationButtons';
import styles from './page.module.css';

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

    const shimmer = (w: number, h: number) => `
      <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <linearGradient id="g">
            <stop stop-color="#333" offset="20%" />
            <stop stop-color="#222" offset="50%" />
            <stop stop-color="#333" offset="70%" />
          </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="#333" />
        <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
        <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
      </svg>`;

    const toBase64 = (str: string) =>
        typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);
    return (
        <>
            <NavigationButtons listOfProducts={products} productSlug={product} categorySlug={category} />
            <div className={styles.pdp}>
                <div style={{ position: 'relative' }}>
                    <Image
                        fill
                        src={portada.url}
                        alt={nombre}
                        priority={true}
                        style={{ objectFit: 'cover', objectPosition: 'top left' }}
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                    />
                </div>
                <div className={styles.pdp__info}>
                    <h1>{nombre}</h1>
                    <h2>{descripcion}</h2>
                    <h3>{precio}</h3>
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
            </div>
        </>
    );
}
