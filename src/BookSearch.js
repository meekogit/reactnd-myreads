import React from 'react';
import BooksGrid from './BooksGrid';
import escapeRegExp from 'escape-string-regexp';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Notify from './Notify'

class BookSearch extends React.Component {

  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    books: PropTypes.array
  }

  NOTIFY = {
      standby: { type: 'no-notification', message: 'No requests being made'},
      searchingBooks: { type: 'spinner', message: 'Searching books'},
      foundBooks: { type: 'success', message: 'Books successfully loaded'},
      noBookFound: { type: 'no-results', message: 'No book found'},
      fetchError: { type: 'error', message: 'Book fetch failed!'},
  };

  state = {
    query: '',
    bookResults: [],
    status: this.NOTIFY.standby
  };

  updateQuery = (query) => {

    this.setState({ query: query.replace(/\s+/g, ' ') });

    if (query === '') {
      this.setState({ bookResults: [], status: this.NOTIFY.standby });
    } else {
      this.setState({ status: this.NOTIFY.searchingBooks });
      BooksAPI.search(query).then((response) => {
        this.setState((state, props) => {

          let filteredBooks = [];
          let status = this.NOTIFY.standby;

          if (state.query === '')
            status = this.NOTIFY.standby;
          else if (response.error) {
            status = this.NOTIFY.noBookFound;
          } else {
            filteredBooks = this.parseBooks(response, props.books);
            status = this.NOTIFY.foundBooks;
            status = {...status, message: `Found ${filteredBooks.length} books that match`};
            setTimeout(function() { this.setState({ status: this.NOTIFY.standby }); }.bind(this), 3000);
          }

          return ({ bookResults: filteredBooks, status: status });
        });
      }).catch((error) => {
        this.setState({ status: this.NOTIFY.fetchError });
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

  render() {
    const { query, bookResults, status } = this.state;
    const onChangeShelf = this.props.onChangeShelf;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input autoFocus
              value={query}
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {(status === this.NOTIFY.standby) || <Notify status={status}/>}
          {(status === this.NOTIFY.searchingBooks) || (
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
