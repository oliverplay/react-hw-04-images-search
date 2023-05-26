const ImageGalleryItem = ({
  smallImage,
  largeImage,
  onImageClick,
  toggleModal,
}) => {
  const handleClick = () => {
    toggleModal();
    onImageClick(largeImage);
  };

  return (
    <li>
      <img alt="img" src={smallImage} onClick={handleClick} />
    </li>
  );
};

export default ImageGalleryItem;
