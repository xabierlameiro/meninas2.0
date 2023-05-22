
import { fetchGraphQL } from '@helpers/graphql'
import Image from 'next/image'

async function getProductBySlug(slug: string) {
    const {data} = await fetchGraphQL(`
    query {
        productoCollection(where: {url: "${slug}"}) {
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
export default async function Page({params}: {params: {product: string}}) {
    const [product] = await getProductBySlug(params.product)
    return (
        <div>
            <h1>{product.nombre}</h1>
            <h2>{product.descripcion}</h2>
            <h3>{product.precio}</h3>
            <Image src={product.portada.url} alt={product.nombre} width={500} height={500} priority={true} />
        </div>
    )

}