import { fetchGraphQL } from '@/helpers/contentful';
import Image from '@/components/Image';
import Link from 'next/link';
import GridContainer from '@/components/Layout/GridContainer';
import Card from '@/components/Layout/Card';

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
        <GridContainer>
            {data?.map((producto: any, index: number) => (
                <Card key={producto.nombre}>
                    <Link href={`/${producto.categoriaPrincipal.slug}/${producto.url}`}>
                        <Image
                            source={producto.portada.url}
                            alt={producto.nombre}
                            priority={index === 0}
                            width={600}
                            height={850}
                        />
                    </Link>
                </Card>
            ))}
        </GridContainer>
    );
}
