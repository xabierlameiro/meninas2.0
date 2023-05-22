
import { fetchGraphQL } from '@helpers/graphql'
import Link from 'next/link'

export async function getMenus() {
    const { data } = await fetchGraphQL(`
        query {
            categorias: categoriaCollection(where: { marca: false }, order:nombre_ASC) {
              items {
                nombre
                descuento
                marca
                resaltar
                slug    
              }
            }
            marcas: categoriaCollection(where: { marca: true }, order: nombre_ASC) {
              items {
                nombre
                descuento
                marca
                resaltar
                slug
              }
            }
          }
    `)
    return data
}

export default async function Menu() {
    const menu = await getMenus();

    return (
        <div>
            <h1>Menu</h1>
            {
                menu?.categorias.items.map((categoria: any) => {
                    return (
                        <Link key={categoria.nombre} href={`/${categoria.slug}`}>
                            {categoria.nombre}
                        </Link>
                    )
                })
            }
            {
                menu?.marcas.items.map((marca: any) => {
                    return (
                        <Link key={marca.nombre} href={`/${marca.slug}`}>
                            {marca.nombre}
                        </Link>
                    )
                })
            }
        </div>
    )
}