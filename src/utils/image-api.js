import axios from 'axios';

const key = '33708941-9afad2bda68efbaf1594840f2';

export default function fetchImages(topic, page) {
  const URL = `https://pixabay.com/api/?q=${topic}&key=${key}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`;

  return axios
    .get(URL)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error(
        `There are no photos for this topic: ${topic}. Please try a different topic.`
      );
    });
}
