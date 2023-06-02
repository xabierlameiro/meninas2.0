import LegacyImage from 'next/image';

const cloudinary = 'https://res.cloudinary.com/dlfkxcjkq/image/fetch/';

const Image = ({ source, alt, width, height, priority }: any) => {
    return (
        <LegacyImage
            alt={alt}
            fill
            priority={priority}
            src={`${cloudinary}h_${height},w_${width}/${source}`}
            placeholder="blur"
            blurDataURL={`${cloudinary}q_20,h_${height},w_${width}/${source}`}
        />
    );
};

export default Image;
