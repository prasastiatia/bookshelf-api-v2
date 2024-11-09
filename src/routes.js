const { addBookHandler, listBookHandler, detailBookHandler, updateBookHandler, deleteBookHandler, queryParamsHandler } = require('./handler');
const routes = [
    {
      method: 'POST',
      path: '/books',
      handler: addBookHandler,
    },

    {
      method : 'GET',
      path: '/books',
      handler: listBookHandler
    },
    {
      method: 'GET',
      path: '/books/{bookId}',
      handler: detailBookHandler,
    },
    {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: updateBookHandler,
    },
     {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: deleteBookHandler,
    },
  ];
   
  module.exports = routes;