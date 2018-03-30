import React from 'react';
import Library from './Library'
import './App.css';

class BooksApp extends React.Component {

  state ={
    books: [
      {
        id: '1',
        title: 'To Kill a Mockingbird',
        authors: ['Harper Lee'],
        cover: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
        shelf: 'currentlyReading'
      },
      {
        id: '2',
        title: 'Ender\'s Game',
        authors: ['Orson Scott Card'],
        cover: 'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api',
        shelf: 'currentlyReading'
      },
      {
        id: '3',
        title: '1776',
        authors: ['David McCullough'],
        cover: 'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api',
        shelf: 'wantToRead'
      },
      {
        id: '4',
        title: 'Harry Potter and the Sorcerer\'s Stone',
        authors: ['J.K. Rowling'],
        cover: 'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api',
        shelf: 'wantToRead'
      },
      {
        id: '5',
        title: 'The Hobbit',
        authors: ['J.R.R. Tolkien', 'Me'],
        cover: 'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api',
        shelf: 'read'
      }
    ]
  };

  updateShelf = (bookId, shelf) => {
    this.setState((state) => ({
      books: state.books.map((book) => (
        book.id === bookId ? {...book, shelf:`${shelf}`} : book
      ))
    }))
  };

  render() {
    return (
      <div className="app">
        <Library
          title={"MyReads"}
          onChangeShelf={this.updateShelf}
          books={this.state.books}
          shelves={[
            {
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
            },
          ]}
        />
      </div>
    );
  }
}

export default BooksApp;
