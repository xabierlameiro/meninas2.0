import { fetchGraphQL } from '@helpers/graphql';
import Link from 'next/link';
import styles from './menu.module.css';

export async function getMenus() {
    const { data } = await fetchGraphQL(`
    query {
        menu:categoriaCollection(order: [marca_ASC, nombre_ASC]) {
          items {
            nombre
            descuento
            marca
            resaltar
            slug
            disponible:linkedFrom {
              prendas:productoCollection {
                total
              }
            }
          }
        }
      }
    `);
    return data;
}

export default async function Menu() {
    const { menu } = await getMenus();

    return (
        <aside className={styles.aside}>
            <div className={styles.menu}>
                <Link href="/">Toda la tienda</Link>
                <ul>
                    {menu.items
                        .filter((cat: any) => cat.disponible.prendas.total > 0)
                        .map((categoria: any) => {
                            return (
                                <li key={categoria.nombre}>
                                    <Link href={`/${categoria.slug}`}>{categoria.nombre}</Link>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </aside>
    );
}
