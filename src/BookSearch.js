import React from 'react';
import BooksGrid from './BooksGrid';
import escapeRegExp from 'escape-string-regexp';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'

class BookSearch extends React.Component {

  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    books: PropTypes.array
  }

  state = {
    query: '',
    bookResults: [],
    status: 'waiting'
  };

  updateQuery = (query) => {

    this.setState({ query: query.replace(/\s+/g, ' ') });

    if (query === '') {
      this.setState({ bookResults: [], status: 'waiting' });
    } else {
      this.setState({ status: 'searching' });
      BooksAPI.search(query).then((response) => {
        this.setState((state, props) => {

          let filteredBooks = [];
          let status = '';
          // Check if query was cleared while fetching books
          if (state.query === '')
            status = 'waiting';
          else if (response.error) {
            status = 'error';
          } else {
            filteredBooks = this.parseBooks(response, props.books);
            status = 'ready';
          }

          return ({ bookResults: filteredBooks, status: status });
        });
      });
    }
  };

  filterBooks = (books) => {
    const match = new RegExp(escapeRegExp(this.state.query), 'i');
    return books.filter((book) => (
      match.test(book.title) || book.authors.find((author) => (match.test(author)))
    ));
  };

  findBook = (id, books) => (books.find((book) => id === book.id));

  setShelf = (book, shelf='none') => ({...book, shelf: shelf});

  parseBooks = (searchResults, libraryBooks) => {
    const filteredLibrary = this.filterBooks(libraryBooks);
    return searchResults.map((book) => {
      let found = this.findBook(book.id, filteredLibrary);
      return found ? this.setShelf(book, found.shelf) : this.setShelf(book, 'none')
    });
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState((state, props) => (
      { bookResults: this.parseBooks(state.bookResults, nextProps.books) })
    );
  };

  searching = <div className="searching-animation">Searching...</div>;
  noResultsFound = <div className="searching-animation">No Results</div>;

  render() {
    const { query, bookResults, status } = this.state;
    const onChangeShelf = this.props.onChangeShelf;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input value={query}
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          { (status === 'searching') ? (
            this.searching
          ) : (status === 'error') ? (
            this.noResultsFound
          ) : (
            <BooksGrid
              books={bookResults}
              onChangeShelf={onChangeShelf}
            />
          )}
        </div>
      </div>
    );
  }
}

export default BookSearch;
