type Stock = `${string}:${string}`;

type Detail = {
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
    };
    categoriasCollection: {
        items: {
            nombre: string;
        }[];
    };
};
