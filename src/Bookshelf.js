import React from 'react';
import BooksGrid from './BooksGrid';
import PropTypes from 'prop-types';

function Bookshelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <BooksGrid
          books={props.books}
          onChangeShelf={props.onChangeShelf}
        />
      </div>
    </div>
  );
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func
}

export default Bookshelf;
