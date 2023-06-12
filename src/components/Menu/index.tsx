import { fetchGraphQL } from '@helpers/contentful';
import menu from '@queries/menu.graphql';
import Link from 'next/link';
import styles from './menu.module.css';
import dynamic from 'next/dynamic';

const Button = dynamic(() => import('./Button'), { ssr: true });

const getMenus = async () => {
    const { data } = await fetchGraphQL(menu);
    return data.menu.items as MenuRow[];
};

const Menu = async () => {
    const menu = await getMenus();

    return (
        <aside className={styles.aside}>
            <Button>
                <div className={styles.menu}>
                    <Link href="/">Toda la tienda</Link>
                    <ul>
                        {menu
                            .filter((row: MenuRow) => row.disponible.prendas.total > 0)
                            .map((row: MenuRow) => {
                                return (
                                    <li key={row.nombre}>
                                        <Link href={`/${row.slug}`}>{row.nombre}</Link>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </Button>
        </aside>
    );
};

export default Menu;
