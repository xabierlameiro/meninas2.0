import { fetchGraphQL } from '@/helpers/contentful';
import Image from '@/components/Image';
import Link from 'next/link';
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
            {data?.map((producto: any, index: number) => (
                <div key={producto.nombre}>
                    <Link href={`/${producto.categoriaPrincipal.slug}/${producto.url}`}>
                        <Image
                            source={producto.portada.url}
                            alt={producto.nombre}
                            width={450}
                            height={700}
                            priority={index === 0}
                        />
                    </Link>
                </div>
            ))}
        </div>
    );
}
