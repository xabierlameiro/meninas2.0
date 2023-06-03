import LegacyImage from 'next/image';

const cloudinary = 'https://res.cloudinary.com/dlfkxcjkq/image/fetch/';

const Image = ({ src, fill = false, alt, width, height, priority }: ImageProps) => {
    return (
        <LegacyImage
            alt={alt}
            fill={fill}
            priority={priority}
            src={`${cloudinary}h_${height},w_${width}/${src}`}
            placeholder="blur"
            blurDataURL={`${cloudinary}q_20,h_${height},w_${width}/${src}`}
        />
    );
};

export default Image;
