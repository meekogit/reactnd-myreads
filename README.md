# MyReads: A book Tracking App

## Description
A bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read. It's the first project of _Udacity React Nanodegree_

## Installation

```
$ git clone https://github.com/meekogit/reactnd-myreads.git
$ cd reactnd-myreads
$ npm install
$ npm start
```

## Functionality
* The main page displays a list of "shelves," each of which contains a number of books. The three shelves are:
  * Currently Reading
  * Want to Read
  * Read
* Each book has a control that lets you select the shelf for that book. When you select the option `none` the book is removed from your library.
* The main page also has a link to a search page that allows you to find books to add to your library.
* When you navigate back to the main page from the search page, you should instantly see all of the selections you made on the search page in your library

## Issues
* If the user returns to the main page while a search call to BooksAPI is still pending, a memory leak happens when it finishes and calls setState on a component that isn't mounted anymore.
  * As of this time, there isn't a clear way to abort a fetch call that would be the cleanest solution.
  * Another possibility is moving all the fetch calls to the main component, but given that the searchResults are temporal state and only being used inside the BookSearch component it doesn't seem ideal.
  * Other alternatives considered where disabling the link till the search is done but it didn't solve the problem when the user clicks immediately.

## License
Code released under the [MIT License]()
