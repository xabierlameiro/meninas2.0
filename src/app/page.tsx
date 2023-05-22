import { fetchGraphQL } from '@helpers/graphql'
import Image from 'next/image';
import Link from 'next/link';

async function getProducts() {
   const {data} = await fetchGraphQL(`
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
        `
        )
        return data?.productoCollection?.items

  }

export default async function Home() {
  const data = await getProducts()

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {data?.map((producto:any) => (
          <li key={producto.nombre}>
            <Link href={`/${producto.categoriaPrincipal.slug}/${producto.url}`}>
              <h2>{producto.nombre}</h2>
              <p>{producto.descripcion}</p>
              <p>{producto.precio}</p>
              <p>{producto.url}</p>
              <Image src={producto.portada.url} alt="Picture of the author" width={200} height={200} />
              <p>{producto.categoriasCollection.items.nombre}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

