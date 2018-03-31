import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {

  static propTypes = {
    book: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string),
      imageLinks: PropTypes.shape({
        thumbnail: PropTypes.string,
        smallThumbnail: PropTypes.string
      }),
      shelf: PropTypes.string.isRequired
    }).isRequired,
    onChangeShelf: PropTypes.func.isRequired
  };

  shouldComponentUpdate = (nextProps, nextState) => (nextProps.book.shelf !== this.props.book.shelf);

  render () {
    const onChangeShelf = this.props.onChangeShelf;
    const book = this.props.book;
    const { title, authors, shelf } = this.props.book;
    const { thumbnail='' , smallThumbnail='' } = this.props.book.imageLinks || {};

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${thumbnail || smallThumbnail})`}}>
            {thumbnail || smallThumbnail ? '' : <div className="book-cover-title">No Cover</div>}
          </div>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={(e) => onChangeShelf(book, e.target.value)}>
              <option disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{(authors) ? authors.join(', ') : 'No Author'}</div>
      </div>
    );
  }
}

export default Book;
