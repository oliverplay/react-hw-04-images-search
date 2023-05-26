import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ images, toggleModal, onImageClick }) => {
  return (
    <ul>
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          smallImage={webformatURL}
          largeImage={largeImageURL}
          onImageClick={onImageClick}
          toggleModal={toggleModal}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
