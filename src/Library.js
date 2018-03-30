import React from 'react';
import Bookshelf from './Bookshelf';
import PropTypes from 'prop-types';

function Library(props) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>{props.title}</h1>
      </div>
      <div className="list-books-content">
        <div>
          {props.shelves.map((shelf) =>
              <Bookshelf
                key={shelf.id}
                title={shelf.title}
                onChangeShelf={props.onChangeShelf}
                books={props.books.filter((book) => (book.shelf === shelf.id))}
              />
          )}
        </div>
      </div>
      <div className="open-search">
        <a className="open-search">Add Book</a>
      </div>
    </div>
  );
}

Library.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  shelves: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string
    })
  ),
  onChangeShelf: PropTypes.func
}

export default Library;
