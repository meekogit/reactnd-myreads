import React from 'react';
import PropTypes from 'prop-types';

function Book(props) {

  const onChangeShelf = props.onChangeShelf;
  const book = props.book;
  const { title, authors, shelf } = props.book;
  const { thumbnail, smallThumbnail } = props.book.imageLinks;

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${thumbnail || smallThumbnail})`}}>
          {thumbnail || smallThumbnail ? '' : <div className="book-cover-title">No Cover</div>}
        </div>
        <div className="book-shelf-changer">
          <select value={shelf} onChange={(e) => onChangeShelf({...book, shelf: e.target.value })}>
            <option disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors.join(', ') || 'No Author'}</div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string,
      smallThumbnail: PropTypes.string
    }),
    shelf: PropTypes.string.isRequired
  }).isRequired,
  onChangeShelf: PropTypes.func.isRequired
};

export default Book;
