type Stock = `${string}:${string}`;

type ContentfulProduct = {
    sys: {
        id: string;
    };
    nombre: string;
    descripcion: string;
    stock: Stock[];
    precio: number;
    url: string;
    thumbnails: {
        items: ThumbNail[];
    };
    categoriaPrincipal: {
        slug: string;
    };
    portada: {
        url: string;
        width: number;
        height: number;
    };
    categoriasCollection: {
        items: {
            nombre: string;
            descuento: number;
            slug: string;
            resaltar: boolean;
            envio: {
                cantidad: number;
            };
        }[];
    };
};
