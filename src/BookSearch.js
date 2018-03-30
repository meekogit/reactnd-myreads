import React from 'react';
import BooksGrid from './BooksGrid';
import escapeRegExp from 'escape-string-regexp'

class BookSearch extends React.Component {

  state = {
    query: ''
  };

  updateQuery = (query) => {
    this.setState({ query: query.replace(/\s+/g, ' ') });
  };

  filterBooks = (books) => {
    const match = new RegExp(escapeRegExp(this.state.query), 'i');
    return books.filter((book) => (
      match.test(book.title) || book.authors.find((author) => (match.test(author)))
    ));
  };

  searchBooks = () => ((this.state.query) ? this.filterBooks(this.props.books) : []);

  render() {
    let searchResults = this.searchBooks();

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search">Close</a>
          <div className="search-books-input-wrapper">
            <input value={this.state.query}
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            books={searchResults}
            onChangeShelf={this.props.onChangeShelf}
          />
        </div>
      </div>
    );
  }
}

export default BookSearch;
