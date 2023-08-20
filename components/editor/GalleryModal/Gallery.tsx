import { BsCardImage } from 'react-icons/bs';
import Image from './Image';
import { FC } from 'react';

interface Props {
  images: { src: string }[];
  onSelect(src: string): void;
  uploading?: boolean;
  selectedImage: string;
}

const Gallery: FC<Props> = ({ images, uploading = false, onSelect, selectedImage = '' }): JSX.Element => {
  return (
    <div className="flex flex-wrap">
      {uploading && (
        <div className="basis-1/4 p-1">
          <div className=" w-[155px] aspect-square flex flex-col items-center justify-center bg-secondary-light text-primary-dark rounded animate-pulse">
            <BsCardImage size={50} />
            <p>Uploading</p>
          </div>
        </div>
      )}
      {images.map(({ src }, index) => {
        return (
          <div key={index} className="basis-1/4 p-1">
            <Image src={src} selected={selectedImage === src} onClick={() => onSelect(src)} />
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
