import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

function BooksGrid(props) {
  return (
    <ol className="books-grid">
    {props.books.map((book) =>
      <li key={book.id}>
        <Book
          book={book}
          onChangeShelf={props.onChangeShelf}
        />
      </li>
    )}
    </ol>
  );
}

BooksGrid.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChangeShelf: PropTypes.func
};

export default BooksGrid;
