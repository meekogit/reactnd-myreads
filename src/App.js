import React from 'react';
import Library from './Library';
import BookSearch from './BookSearch';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {

  NOTIFY = {
      standby: { id: 'stand-by', message: 'No requests being made'},
      loadingBooks: { id: 'loading-books', message: 'Loading books'},
      loadedBooks: { id: 'loaded-books', message: 'Books successfully loaded'},
      fetchError: { id: 'fetch-error', message: 'Book fetch failed'},
      updating: { id: 'updating-book', message: 'Updating Library'},
      removedBook: { id: 'removed-book', message: 'Book removed from Library'},
      addedBook:  { id: 'added-book', message: 'Book added to Library'},
      updatedBook:  { id: 'updated-book', message: 'Book successfully moved'},
      updateError: { id: 'update-error', message: 'Error updating library'}
  };

  state ={
    books: [],
    status: this.NOTIFY.standby
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
    this.setState({ status: this.NOTIFY.removedBook });
  };

  addBook = (book) => {
    this.setState((state) => ({ books: [...state.books, book] }));
    this.setState({ status: this.NOTIFY.addedBook });
  };

  updateBook = (book, shelf) => {
    this.setState((state) => ({
      books: state.books.map((b) => (book.id === b.id) ? {...book, shelf: shelf} : b )
    }));
    this.setState({ status: this.NOTIFY.updatedBook });
  }

  updateLibrary = (book, shelf) => {
    this.setState({ status: this.NOTIFY.updating });
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
        this.setState({ status: this.NOTIFY.updateError });
      }
    }).catch((error) => {
      this.setState({ status: this.NOTIFY.updateError });
    });
  };

  loadBooks = (books=[]) => this.setState({ books, status: this.NOTIFY.loadedBooks });

  componentDidMount = () => {
    this.setState(() => {
      return { status: this.NOTIFY.loadingBooks };
    }
  );
    BooksAPI.getAll().then((books) => {
      this.loadBooks(books);
      console.log('Books Loaded!');
    }).catch((error) => {
      this.setState({ status: this.NOTIFY.fetchError });
    });
  };

  render() {

    const { books, status } = this.state;

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Library
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
