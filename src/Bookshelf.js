import React from 'react'
import BooksGrid from './BooksGrid'

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

export default Bookshelf;
