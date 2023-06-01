import LegacyImage from 'next/image';

const cloudinary = 'https://res.cloudinary.com/dlfkxcjkq/image/fetch/';

const Image = ({ source, alt, width, height }: any) => {
    return (
        <LegacyImage alt={alt} width={width} height={height} src={`${cloudinary}h_${height},w_${width}/${source}`} />
    );
};

export default Image;
