import React from 'react';
import Library from './Library';
import BookSearch from './BookSearch';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
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

  findBook = (book, shelf) => ( shelf && shelf.find((id) => (book.id === id)));

  removeBook = (book) => {
    this.setState((state) => ({
      books: state.books.filter((b) => (book.id !== b.id))
    }));
  };

  addBook = (book) => {
    this.setState((state) => ({ books: [...state.books, book] }));
  };

  updateBook = (book, shelf) => {
    this.setState((state) => ({
      books: state.books.map((b) => (book.id === b.id) ? {...book, shelf: shelf} : b )
    }));
  }

  updateLibrary = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {

      const oldShelf = book.shelf;
      const foundInOdlShelf = this.findBook(book, response[oldShelf]);
      const foundInNewShelf = this.findBook(book, response[shelf]);

      if (shelf === 'none' && !foundInOdlShelf) {
        this.removeBook(book);
      } else if (oldShelf === 'none' && foundInNewShelf) {
        this.addBook({...book, shelf: shelf });
      } else if (!foundInOdlShelf && foundInNewShelf){
        this.updateBook(book, shelf);
      } else {
        console.log(`Error occurred while updating ${book.title}!`);
      }
    });
  };

  loadBooks = (books=[]) => this.setState({ books, loading: false });

  componentDidMount = () => {
    this.setState({ loading: true });
    BooksAPI.getAll().then((books) => {
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
