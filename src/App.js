import React from 'react';
import Library from './Library';
import BookSearch from './BookSearch';
import Notify from './Notify';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {

  NOTIFY = {
      standby: { type: 'no-notification', message: 'No requests being made'},
      loadingBooks: { type: 'info', message: 'Loading books'},
      loadedBooks: { type: 'success', message: 'Books successfully loaded'},
      fetchError: { type: 'error', message: 'Book fetch failed!'},
      updating: { type: 'info', message: 'Updating Library'},
      removedBook: { type: 'success', message: 'Book removed from Library'},
      addedBook:  { type: 'success', message: 'Book added to Library'},
      updatedBook:  { type: 'success', message: 'Book successfully moved'},
      updateError: { type: 'error', message: 'Error updating library'}
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
    this.setState((state) => ({ books: state.books.filter((b) => (book.id !== b.id)) }));
    this.setState({ status: this.NOTIFY.removedBook });
    setTimeout(function() { this.setState({ status: this.NOTIFY.standby }); }.bind(this), 3000);
  };

  addBook = (book) => {
    this.setState((state) => ({ books: [...state.books, book] }));
    this.setState({ status: this.NOTIFY.addedBook });
    setTimeout(function() { this.setState({ status: this.NOTIFY.standby }); }.bind(this), 3000);
  };

  updateBook = (book, shelf) => {
    this.setState((state) => ({
      books: state.books.map((b) => (book.id === b.id) ? {...book, shelf: shelf} : b )
    }));
    this.setState({ status: this.NOTIFY.updatedBook });
    setTimeout(function() { this.setState({ status: this.NOTIFY.standby }); }.bind(this), 3000);
  };

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

  loadBooks = (books=[]) => {
    this.setState({ books, status: this.NOTIFY.loadedBooks });
    setTimeout(function() { this.setState({ status: this.NOTIFY.standby }); }.bind(this), 3000);
  };

  componentDidMount = () => {
    this.setState(() => {
      return { status: this.NOTIFY.loadingBooks };
    }
  );
    BooksAPI.getAll().then((books) => {
      this.loadBooks(books);
    }).catch((error) => {
      this.setState({ status: this.NOTIFY.fetchError });
    });
  };

  render() {

    const { books, status } = this.state;

    return (
      <div className="app">
        {(status === this.NOTIFY.standby) || <Notify status={status} />}
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
            books={books}
          />
        )}/>
      </div>
    );
  }
}

export default BooksApp;
