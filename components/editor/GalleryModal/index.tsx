import ModalContainer, { ModalProps } from '@/components/common/ModalContainer';
import { ChangeEventHandler, FC, useCallback, useState } from 'react';
import Gallery from './Gallery';
import Image from 'next/image';
import ActionButton from '@/components/common/ActionButton';
import { AiOutlineCloudUpload } from 'react-icons/ai';

export interface ImageSelectionResult {
  src: string;
  altText: string;
}

interface Props extends ModalProps {
  images: { src: string }[];
  uploading?: boolean;
  onFileSelect(image: File): void;
  onSelect(result: ImageSelectionResult): void;
}

const GalleryModal: FC<Props> = ({ visible, images, uploading, onSelect, onFileSelect, onClose }): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState('');
  const [altText, setAltText] = useState('');

  const handleClose = useCallback(() => onClose && onClose(), [onClose]);

  const handleOnImageChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { files } = target;
    if (!files) return;

    const file = files[0];
    if (!file.type.startsWith('image')) return handleClose();

    onFileSelect(file);
  };

  const handleSelection = () => {
    if (!selectedImage) return handleClose();

    onSelect({
      src: selectedImage,
      altText: altText,
    });

    handleClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className="max-w-4xl p-2 bg-primary-dark dark:bg-primary rounded">
        <div className="flex">
          {/* Gallery */}
          <div className="basis-[75%] max-h-[450px] overflow-y-auto custom-scroll-bar">
            <Gallery images={images} onSelect={(src) => setSelectedImage(src)} selectedImage={selectedImage} uploading={uploading} />
          </div>

          {/* Image Selection n Upload */}
          <div className="basis-1/4 px-2">
            <div className="space-y-4">
              <div>
                <input onChange={handleOnImageChange} hidden type="file" id="image-input" />
                <label htmlFor="image-input">
                  <div className="w-full border-2 border-action text-action flex justify-center items-center space-x-2 p-2 cursor-pointer rounded">
                    <AiOutlineCloudUpload size={25} />
                    <span>Upload Image</span>
                  </div>
                </label>
              </div>
              {selectedImage ? (
                <>
                  <textarea
                    className="resize-none w-full focus:outline-none bg-transparent rounded border-2 border-secondary-dark focus:border-primary  focus:dark:border-primary-dark focus:ring-1 text-primary dark:text-primary-dark h-32 p-1"
                    placeholder="Alt Text"
                    value={altText}
                    onChange={({ target }) => setAltText(target.value)}
                  ></textarea>
                  <ActionButton title="Select" onClick={handleSelection} />
                  <div className="relative aspect-video bg-white">
                    <Image src={selectedImage} alt="selected-image" fill objectFit="contain" />
                  </div>
                </>
              ) : null}{' '}
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default GalleryModal;
