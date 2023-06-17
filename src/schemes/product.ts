import { z } from 'zod';

export const NavigationProductsScheme = z
    .object({
        items: z.array(
            z.object({
                url: z.string(),
            })
        ),
        productUrl: z.string(),
        category: z.string(),
    })
    .transform((data) => {
        const currentItem = data.items.findIndex((item) => item.url === data.productUrl);
        const previusItem = data.items[currentItem - 1]?.url;
        const nextItem = data.items[currentItem + 1]?.url;

        return {
            prevUrl: previusItem ? `${data.category}/${previusItem}` : null,
            nextUrl: nextItem ? `${data.category}/${nextItem}` : null,
        };
    });

export const ThumbNailsScheme = z
    .object({
        items: z.array(
            z.object({
                sys: z.object({
                    id: z.string(),
                }),
                url: z.string(),
                title: z.string(),
            })
        ),
    })
    .transform((data) => data.items.map((item) => ({ id: item.sys.id, url: item.url, title: item.title })));

export const StockScheme = z
    .array(z.string())
    .transform((data) => data.map((stock) => ({ size: stock.split(':')[0], quantity: Number(stock.split(':')[1]) })));

export const ProductScheme = z
    .object({
        sys: z
            .object({
                id: z.string(),
            })
            .optional(),
        nombre: z.string(),
        descripcion: z.string(),
        stock: StockScheme.optional(),
        precio: z.number(),
        url: z.string(),
        thumbnails: ThumbNailsScheme.optional(),
        categoriaPrincipal: z.object({
            slug: z.string(),
        }),
        portada: z.object({
            url: z.string(),
            width: z.number(),
            height: z.number(),
        }),
        categoriasCollection: z.object({
            items: z.array(
                z.object({
                    nombre: z.string(),
                    descuento: z.number().optional().default(0),
                    slug: z.string().nullish(),
                    resaltar: z.boolean().default(false),
                    envio: z
                        .object({
                            cantidad: z.number().default(0),
                        })
                        .nullish(),
                })
            ),
        }),
    })
    .transform((data) => ({
        id: data.sys?.id ?? '',
        name: data.nombre,
        description: data.descripcion,
        url: data.url,
        category: data.categoriaPrincipal.slug,
        image: {
            url: data.portada.url,
            width: data.portada.width,
            height: data.portada.height,
        },
        priceWithoutDiscount: data.precio,
        ...(data.stock && {
            stock: data.stock,
        }),
        ...(data.thumbnails && { thumbnails: data.thumbnails }),
        ...(data?.categoriasCollection && {
            categories: data.categoriasCollection.items
                .sort((a, b) => b.descuento - a.descuento)
                .map((categoria) => ({
                    slug: categoria.slug,
                    name: categoria.nombre,
                })),
            discount: Math.max(...data.categoriasCollection.items.map((categoria) => categoria.descuento)),
            priceWithDiscount: Math.round(
                data.precio -
                    (data.precio *
                        Math.max(...data.categoriasCollection.items.map((categoria) => categoria.descuento))) /
                        100
            ),
            shipping: Math.max(...data.categoriasCollection.items.map((categoria) => categoria?.envio?.cantidad ?? 0)),
        }),
    }));

export const ProductsScheme = z.array(ProductScheme);

declare global {
    type Product = z.infer<typeof ProductScheme>;
    type Products = z.infer<typeof ProductsScheme>;
    type Stock = z.infer<typeof StockScheme>;
    type ThumbNails = z.infer<typeof ThumbNailsScheme>;
    type NavigationProducts = z.infer<typeof NavigationProductsScheme>;
}
