import React from 'react';
import BooksGrid from './BooksGrid';
import escapeRegExp from 'escape-string-regexp'

class BookSearch extends React.Component {

  state = {
    query: ''
  };

  apiBooks = [
    {
      id: '1',
      title: 'API:To Kill a Mockingbird',
      authors: ['Harper Lee'],
      cover: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
    },
    {
      id: '6',
      title: 'API:Robin Hood',
      authors: ['Henry Gilbert'],
    }
  ];

  updateQuery = (query) => {
    this.setState({ query: query.replace(/\s+/g, ' ') });
  };

  filterBooks = (books) => {
    const match = new RegExp(escapeRegExp(this.state.query), 'i');
    return books.filter((book) => (
      match.test(book.title) || book.authors.find((author) => (match.test(author)))
    ));
  };

  // Simulated API fetch
  searchBookApi = () => (this.filterBooks(this.apiBooks));

  findBook = (id, books) => (books.find((book) => id === book.id));

  setShelf = (book, shelf='none') => ({...book, shelf: shelf});

  parseBooks = (searchResults) => {

    let filteredLibrary = this.filterBooks(this.props.books);

    return searchResults.map((book) => {
      let found = this.findBook(book.id, filteredLibrary);
      return found ? this.setShelf(book, found.shelf) : this.setShelf(book)
    });
  }

  searchBooks = () => {
    let results = this.searchBookApi();
    return (results) ? this.parseBooks(results) : [];
  };

  render() {
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
            books={this.state.query ? this.searchBooks() : []}
            onChangeShelf={this.props.onChangeShelf}
          />
        </div>
      </div>
    );
  }
}

export default BookSearch;
