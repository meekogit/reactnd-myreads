import React from 'react';
import BooksGrid from './BooksGrid';

class BookSearch extends React.Component {

  state = { query: '' };

  updateQuery = (query) => {
    this.setState({query: query.replace(/\s+/g, ' ') });
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
            books={this.props.books}
            onChangeShelf={this.props.onChangeShelf}
          />
        </div>
      </div>
    );
  }
}

export default BookSearch;
