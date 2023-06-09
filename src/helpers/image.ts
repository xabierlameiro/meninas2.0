const mediaQuerys = [
    { minWidth: 1536, columns: 5 },
    { minWidth: 1280, columns: 4 },
    { minWidth: 1024, columns: 3 },
    { minWidth: 600, columns: 2 },
    { minWidth: 0, columns: 1 },
];

export const shimmer = (w: number, h: number) => `    
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="#c1c1c1" />
</svg>`;

export const toBase64 = (str: string) =>
    typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

export const getColumns = (
    mediaQueries: {
        minWidth: number;
        columns: number;
    }[]
) => {
    const currentWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    const matchingQuery = mediaQueries.find((query) => currentWidth >= query.minWidth);
    return matchingQuery?.columns ?? 1;
};

export const calculateImageSize = (product: Product, maxWidth: number) => {
    const minWidth = 300;
    const scale = Math.min(maxWidth / product.image.width, 1);
    const width = Math.max(product.image.width * scale, minWidth);
    const height = Math.round(product.image.height * scale);

    const widthForCloudinary = Math.floor(width);
    const heightForCloudinary = Math.floor(height);
    return { width, height, widthForCloudinary, heightForCloudinary };
};

export const getPriorityImages = (data: Products, parentRef: React.RefObject<HTMLDivElement>) => {
    const heightMasonry = parentRef.current?.clientHeight;
    const indexes = [0];

    if (!heightMasonry) return;

    const columns = getColumns(mediaQuerys);

    let startNewColumn = 0;
    for (let i = 0; i < columns; i++) {
        let heightColumn = 0;
        for (let j = startNewColumn; j < data.length; j++) {
            heightColumn += calculateImageSize(data[j], 320).height + 16;

            if (heightColumn > heightMasonry) {
                if (columns === indexes.length) break;
                startNewColumn = j;
                indexes.push(j);
                break;
            }
        }
    }

    return indexes;
};
