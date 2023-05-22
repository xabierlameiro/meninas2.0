
import { fetchGraphQL } from '@helpers/graphql'
import Image from 'next/image';
import Link from 'next/link';

async function getProductsByCategory(category: string) {
    const {data} = await fetchGraphQL(`
    query {
            productoCollection(where:{categorias:{slug:"${category}"}}) {
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
    `)
    return data?.productoCollection?.items
}

export default async function Page({params}: {params: {category: string}}) {
    const products = await getProductsByCategory(params.category)


    return <div>
        <p>{params.category}</p>
        <ul>
            {products?.map((product: any) => (
                <li key={product.url}>
                    <Link href={`/${params.category}/${product.url}`}>
                    <p>{product.nombre}</p>
                    <p>{product.descripcion}</p>
                    <p>{product.precio}</p>
                    <p>{product.url}</p>
                    <p>{product.categoriaPrincipal.slug}</p>
                    <Image src={product.portada.url} width={200} height={200} alt=''/>
                    <div>{product.categoriasCollection.items.map((categoria: any) => (
                        <span key={categoria.nombre}>{categoria.nombre}</span>
                    ))}</div>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
}