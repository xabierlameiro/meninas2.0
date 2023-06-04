import { fetchGraphQL } from '@helpers/contentful';
import Link from 'next/link';
import styles from './menu.module.css';
import Button from './Button';
import menu from '@queries/menu.graphql';

export async function getMenus() {
    const { data } = await fetchGraphQL(menu);
    return data;
}

export default async function Menu() {
    const { menu } = await getMenus();

    return (
        <aside className={styles.aside}>
            <Button>
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
            </Button>
        </aside>
    );
}
