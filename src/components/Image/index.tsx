import LegacyImage from 'next/legacy/image';

const cloudinary = 'https://res.cloudinary.com/dlfkxcjkq/image/upload/';

const Image = ({ source, alt, width, height }: any) => {
    return (
        <LegacyImage
            alt={alt}
            width={width}
            height={height}
            src={`${cloudinary}/h_${height},w_${width}/${source}.jpg`}
            blurDataURL={`${cloudinary}q_1,e_blur:1000/h_${height},w_${width}/${source}.jpg`}
            placeholder="blur"
        />
    );
};

export default Image;
