type MenuRow = {
    nombre: string;
    descuento: number;
    marca: string;
    resaltar: boolean;
    slug: string;
    disponible: {
        prendas: {
            total: number;
        };
    };
};
