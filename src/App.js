import React from 'react';
import Library from './Library';
import BookSearch from './BookSearch';
import { Route } from 'react-router-dom';
import * as BookAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {

  state ={
    books: [],
    loading: false
  };

  shelves = [{
    id: 'currentlyReading',
    title: 'Currently Reading'
  },
  {
    id: 'wantToRead',
    title: 'Want to Read'
  },
  {
    id: 'read',
    title: 'Read'
  }];


  removeBook = (book) => {
    this.setState((state) => ({
      books: state.books.filter((b) => (book.id !== b.id))
    }));
  };

  addBook = (book) => {
    this.setState((state) => ({ books: [...state.books, book] }));
  };

  updateBook = (book) => {
    this.setState((state) => ({
      books: state.books.map((b) => (book.id === b.id) ? book : b )
    }));
  }

  updateLibrary = (book) => {
    if (book.shelf === 'none') {
      this.removeBook(book);
    } else {
      if (this.state.books.find((b) => b.id === book.id)) {
        this.updateBook(book);
      } else {
        this.addBook(book);
      }
    }
  };

  loadBooks = (books=[]) => this.setState({ books, loading: false });

  componentDidMount = () => {
    this.setState({ loading: true });
    BookAPI.getAll().then((books) => {
      //TODO: check if getAll failed and inform the user
      this.loadBooks(books);
    });
  };

  render() {

    const { books, loading } = this.state;

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          loading ?
            <div className="loading-books">Loading Books...</div>
          : <Library
              title={"MyReads"}
              onChangeShelf={this.updateLibrary}
              books={books}
              shelves={this.shelves}
            />
        )}/>
        <Route path="/search" render={() => (
          <BookSearch
            onChangeShelf={this.updateLibrary}
            books={this.state.books}
          />
        )}/>
      </div>
    );
  }
}

export default BooksApp;
