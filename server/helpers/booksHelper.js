
const _ = require('lodash');

// eslint-disable-next-line import/no-extraneous-dependencies
const { nanoid } = require('nanoid');

const addBooks = async (dataObject) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = dataObject;

    try {

        const id = nanoid(16);
        
        const finished = pageCount === readPage;
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;
        const response = {
            id,
            name,
            year, 
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            insertedAt,
            updatedAt
        } 
        
        return Promise.resolve(response);
    } catch (err) {
        
        return Promise.resolve(err);
    }
}

const listBooks = async (dataObject) => {
    const { name, reading, finished, books } = dataObject;

    try {
        let response;

        if (name) {
            const lowerQuery = name.toLowerCase();
            response = books.filter((book) => book.name.toLowerCase().includes(lowerQuery) ); 
        }

        if (reading) {
            const booleanRead = reading === '1'; 
            response = books.filter((book) => book.reading.toString() === booleanRead.toString()); 
        }

        if (finished) {
            const booleanFinished = finished === '1';
            response = books.filter((book) => book.finished.toString() === booleanFinished.toString()); 
        }
        
        return Promise.resolve(response);
    } catch (err) {
        
        return Promise.resolve(err);
    }
}

const detailBook = async (dataObject) => {
    const { books, bookId } = dataObject;

    try {
        
        const response = books.filter((book) => book.id === bookId)[0];
        
        return Promise.resolve(response);
    } catch (err) {
        
        return Promise.resolve(err);
    }
}

const updateBook = async (dataObject) => {
    const { bookId, name, year, author, summary, publisher, pageCount, readPage, reading } = dataObject;
    let { books } = dataObject

    try {
        
        const finished = pageCount === readPage;
        const updatedAt = new Date().toISOString();

        const index = books.findIndex((book) => book.id === bookId); 

        if (index !== -1) {
            books[index] = {
              ...books[index],
              name,
              year,
              author,
              summary,
              publisher,
              pageCount,
              readPage,
              reading,
              finished,
              updatedAt,
            };
            
        } else {
            books = []
        }
        return Promise.resolve(books);
    } catch (err) {
        
        return Promise.resolve(err);
    }
}

const deleteBook = async (dataObject) => {
    const { books, bookId } = dataObject;

    try {
        // eslint-disable-next-line no-shadow
        const response = [];
        const index = books.filter((book) => book.id === bookId);
        

        if (!_.isEmpty(index)) {
            books.splice(index, 1);
        } else {
            response.push(bookId)
        }
        return Promise.resolve(response);
    } catch (err) {
        
        return Promise.resolve(err);
    }
}

module.exports = {
    addBooks,
    listBooks,
    detailBook,
    updateBook,
    deleteBook
  }