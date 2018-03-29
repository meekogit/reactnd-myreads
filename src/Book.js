import React from 'react';

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
      <div className="book-authors">{props.book.authors.join(', ')}</div>
    </div>
  );
}

export default Book;
