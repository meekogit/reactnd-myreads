import React from 'react'
import Book from './Book'

function BooksGrid (props) {
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

export default BooksGrid;
