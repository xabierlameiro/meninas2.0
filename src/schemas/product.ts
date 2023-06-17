import { z } from 'zod';

export const Thumnails = z
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

export const Product = z
    .object({
        sys: z.object({
            id: z.string(),
        }),
        nombre: z.string(),
        descripcion: z.string(),
        stock: z.array(z.string()),
        precio: z.number(),
        url: z.string(),
        thumbnails: Thumnails,
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
                    descuento: z.number().default(0),
                    slug: z.string(),
                    resaltar: z.boolean().default(false),
                    envio: z
                        .object({
                            cantidad: z.number().default(0),
                        })
                        .nullable(),
                })
            ),
        }),
    })
    .transform((data) => ({
        id: data.sys.id,
        name: data.nombre,
        description: data.descripcion,
        stock: data.stock.map((stock) => ({ size: stock, quantity: 1 })),
        url: data.url,
        category: data.categoriaPrincipal.slug,
        image: {
            url: data.portada.url,
            width: data.portada.width,
            height: data.portada.height,
        },
        thumbnails: data.thumbnails,
        priceWithoutDiscount: data.precio,
        discount: Math.max(...data.categoriasCollection.items.map((categoria) => categoria.descuento)),
        priceWithDiscount: Math.round(
            data.precio -
                (data.precio * Math.max(...data.categoriasCollection.items.map((categoria) => categoria.descuento))) /
                    100
        ),
        shipping: Math.max(...data.categoriasCollection.items.map((categoria) => categoria?.envio?.cantidad ?? 0)),
    }));
