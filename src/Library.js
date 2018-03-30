import React from 'react';
import Bookshelf from './Bookshelf'

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
    </div>
  );
}

export default Library;
