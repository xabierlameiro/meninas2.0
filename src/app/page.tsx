import { fetchGraphQL } from '@helpers/graphql';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import styles from './page.module.css';

async function getProducts() {
    const { data } = await fetchGraphQL(`
          query {
            productoCollection {
              items {
                nombre
                descripcion
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
          }
        `);
    return data?.productoCollection?.items;
}

export default async function Home() {
    const data = await getProducts();
    return (
        <div className={styles.grid}>
            {data?.map((producto: any) => (
                <div key={producto.nombre}>
                    <Link href={`/${producto.categoriaPrincipal.slug}/${producto.url}`}>
                        <Image src={producto.portada.url} alt="Picture of the author" width={300} height={300} />
                    </Link>
                </div>
            ))}
        </div>
    );
}
