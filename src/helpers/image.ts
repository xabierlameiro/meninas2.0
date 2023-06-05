export const shimmer = (w: number, h: number) => `    
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="#F0F0F0" />
</svg>`;

export const toBase64 = (str: string) =>
    typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);
