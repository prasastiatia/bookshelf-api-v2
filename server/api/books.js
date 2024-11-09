const _ = require('lodash');

const BooksHelper = require('../helpers/booksHelper');

const books = []

const addBooks = async (request, h) => {
    
    const name = request.payload.name
    const year = request.payload.year
    const author = request.payload.author
    const summary = request.payload.summary
    const publisher = request.payload.publisher
    const pageCount = request.payload.pageCount
    const readPage = request.payload.readPage
    const reading = request.payload.reading
    
    let response;

    if (_.isEmpty(name)) {
      
      response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku'
      })
      .code(400)
      return response;
    } 

    if (readPage > pageCount) {
      response = h
        .response({
          status: 'fail',
          message:
            'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        })
        .code(400)
      return response;
    }

    const addBooksFunction = await BooksHelper.addBooks({
        request,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
      });
    
    books.push(addBooksFunction)  
    
    const isSuccess = books.filter((book) => book.id).length > 0; 

    if (isSuccess) {
   
      response = h.response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: {
            bookId: addBooksFunction.id,
          },
        })
        .code(201)
      return response;
    }

  
  response = h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    })
    .code(500)
  return response;
    
};

const listBooks = async (request, h) => {
  const { name, reading, finished } = request.query;

  if (!name && !reading && !finished) {
    const response = h
      .response({
        status: 'success',
        data: {
          books: books.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      })
      .code(200)

    return response;
  }
  
  const listBooksAll = await BooksHelper.listBooks({
    books,
    name,
    reading,
    finished
  });

  const response = h.response({
                status: 'success',
                data: {
                  books: listBooksAll.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                  })),
                },
              })
              .code(200)
  return response
};

const detailBook = async (request, h) => {

  const { bookId } = request.params ;
  
  const detailBookExist = await BooksHelper.detailBook({
    books,
    bookId
  });

  let response;

  if(!_.isEmpty(detailBookExist)) {
    response = h.response({
      status: 'success',
      data: {
        books: detailBookExist,
      },
    })
    .code(200)
  } else {
    response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    })
    .code(404)
  }

  
  return response
};

const updateBook = async (request, h) => {

  const { bookId } = request.params ;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (_.isEmpty(name)) {
    
    const response = h
      .send({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      })
      .code(400)
    return response;
  }

  if (readPage > pageCount) {
    
    const response = h
      .send({
        status: 'fail',
        message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400)
    return response;
  }
  
  const updateBookExist = await BooksHelper.updateBook({
    books,
    bookId,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  });

  let response;

  if(!_.isEmpty(updateBookExist)) {
    response = h.response({
      status: 'success',
      data: {
        books: updateBookExist,
      },
    })
    .code(200)
  } else {
    response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    })
    .code(404)
  }

  return response
};

const deleteBook = async (request, h) => {

  const { bookId } = request.params ;
  let response;
  
  if(_.isEmpty(bookId)) {
    response = h.status(400).send({
      status: 'fail',
      message: 'Mohon isi id buku',
    })
    return response
  }

  const deleteBookExist = await BooksHelper.deleteBook({
    books,
    bookId
  });

  
  if(_.isEmpty(deleteBookExist)) {
    response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    })
    .code(200)
  } else {
    response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    })
    .code(404)
  }

  
  return response
};


module.exports = {
  addBooks,
  updateBook,
  detailBook,
  listBooks,
  deleteBook
};