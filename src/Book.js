import React from 'react';
import PropTypes from 'prop-types'

function Book(props) {
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${props.book.cover})`}}></div>
        <div className="book-shelf-changer">
          <select value={props.book.shelf} onChange={(e) => props.onChangeShelf(props.book.id, e.target.value)}>
            <option disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors.join(', ') || 'No Author'}</div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    cover: PropTypes.string,
    shelf: PropTypes.string.isRequired
  }).isRequired,
  onChangeShelf: PropTypes.func.isRequired
};

export default Book;
