import { useState } from 'react';
import notiflix from 'notiflix';

function SearchBar({ onSubmit }) {
  const [topic, setTopic] = useState('');

  function handleTopicChange(e) {
    setTopic(e.currentTarget.value.toLowerCase());
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!topic.trim()) {
      notiflix.Notify.info('Please enter a topic to search');
      return;
    }

    onSubmit(topic);
    setTopic('');
  }

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <button type="submit">Search</button>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={topic}
          onChange={handleTopicChange}
        />
      </form>
    </header>
  );
}

export default SearchBar;
