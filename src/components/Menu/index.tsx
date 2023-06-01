import { fetchGraphQL } from '@/helpers/contentful';
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
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 -4 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    width={30}
                    height={30}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </div>
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
