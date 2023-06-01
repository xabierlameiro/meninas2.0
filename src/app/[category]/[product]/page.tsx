import { fetchGraphQL } from '@/helpers/contentful';
import Image from '@/components/Image';
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
            cloudinary
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
        detail: { sys, nombre, descripcion, precio, portada, stock, cloudinary },
        products,
    } = await getProductBySlug(product, category);

    /*    const shimmer = (w: number, h: number) => `
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
        typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str); */
    return (
        <>
            <NavigationButtons listOfProducts={products} productSlug={product} categorySlug={category} />
            <div className={styles.pdp}>
                <div style={{ position: 'relative' }}>
                    <Image width={600} height={900} source={cloudinary?.[0]?.public_id} alt={nombre} />
                </div>
                <div className={styles.pdp__info}>
                    <h1>{cloudinary?.[0]?.public_id}</h1>
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
