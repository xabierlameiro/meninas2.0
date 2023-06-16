type MenuRow = {
    nombre: string;
    descuento: number;
    marca: string;
    resaltar: boolean;
    slug: string;
    envio: {
        cantidad: number;
    };
    disponible: {
        prendas: {
            total: number;
        };
    };
};
