import React, { useEffect, useState } from 'react';
import Notiflix from 'notiflix';
import fetchImages from './utils/image-api';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';
import Button from './components/Button';
import Modal from './components/Modal';

function App() {
  const [topic, setTopic] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);

  useEffect(() => {
    if (topic === '') {
      return;
    }
    setStatus('pending');

    fetchImages(topic, page)
      .then(resp => {
        const images = resp.hits.map(({ id, largeImageURL, webformatURL }) => ({
          id,
          largeImageURL,
          webformatURL,
        }));
        setImages(prevState => [...prevState, ...images]);
        setTotal(resp.total);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [page, topic]);

  function handleFormSubmit(query) {
    if (topic === query) {
      Notiflix.Notify.info('You are already looking at them');
    } else {
      setImages([]);
      setTopic(query);
      setPage(1);
    }
  }

  function onLoadMoreButtonClick() {
    setPage(prevPage => prevPage + 1);
  }

  function toggleModal() {
    setShowModal(prevShowModal => !prevShowModal);
  }

  function imageClick(image) {
    setLargeImage(image);
  }

  return (
    <>
      <SearchBar onSubmit={handleFormSubmit} />
      {images.length > 0 && (
        <ImageGallery
          images={images}
          toggleModal={toggleModal}
          onImageClick={imageClick}
        />
      )}
      {images.length < total && images.length > 0 && status === 'resolved' && (
        <Button onClick={onLoadMoreButtonClick} />
      )}
      {status === 'pending' && <Loader />}
      {status === 'rejected' &&
        Notiflix.Notify.failure(
          `Failed to fetch images. Please try again. Error: ${error.message}`
        )}
      {showModal && <Modal onClose={toggleModal} largeImage={largeImage} />}
    </>
  );
}

export default App;
