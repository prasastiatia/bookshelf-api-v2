const { addBooks, listBooks, updateBook, detailBook, deleteBook } = require('./books');

const routes = [
    {
      method: 'POST',
      path: '/books',
      handler: addBooks,
    },

    {
      method : 'GET',
      path: '/books',
      handler: listBooks
    },
    {
      method: 'GET',
      path: '/books/{bookId}',
      handler: detailBook,
    },
    {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: updateBook,
    },
     {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: deleteBook,
    },
  ];
   
  module.exports = routes;