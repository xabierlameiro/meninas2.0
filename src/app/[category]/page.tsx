import { fetchGraphQL } from '@/helpers/contentful';
import Image from 'next/image';
import Link from 'next/link';
import styles from './category.module.css';

async function getProductsByCategory(category: string) {
    const { data } = await fetchGraphQL(`
    query {
        productoCollection(where:{categorias:{slug:"${category}"}}) {
          items {
            nombre
            descripcion
            precio
            url
            cloudinary
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

export default async function Page({ params }: { params: { category: string } }) {
    const products = await getProductsByCategory(params.category);

    return (
        <div className={styles.grid}>
            {products?.map((product: any) => (
                <div key={product.url}>
                    <Link href={`/${params.category}/${product.url}`}>
                        {/*   <p>{product.nombre}</p>
                        <p>{product.descripcion}</p>
                        <p>{product.precio}</p>
                        <p>{product.url}</p>
                        <p>{product.categoriaPrincipal.slug}</p> */}
                        <h1>hola</h1>
                        {products.cloudinary}
                        <Image src={product.portada.url} width={300} height={300} alt="" />
                        {/*        <div>
                            {product.categoriasCollection.items.map((categoria: any) => (
                                <span key={categoria.nombre}>{categoria.nombre}</span>
                            ))}
                        </div> */}
                    </Link>
                </div>
            ))}
        </div>
    );
}
