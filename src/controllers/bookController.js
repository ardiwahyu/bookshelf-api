const books = require('../datas/books');
const { nanoid } = require('nanoid');
const { status, successStatus, errorStatus } = require('../helpers/payload');

const addBookController = (request, h) => {
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading
    } = request.payload;

    if (!name) {
        const response = h.response({
            status: errorStatus,
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
        response.code(status.bad);
        return response;
    }
    if (readPage > pageCount) {
        const response = h.response({
            status: errorStatus,
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(status.bad);
        return response;
    }

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    books.push({
        id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt
    });

    const isSuccess = books.filter((book) => book.id === id).length > 0
    if (isSuccess) {
        const response = h.response({
            status: successStatus,
            message: 'Buku berhasil ditambahkan',
            data: { bookId: id }
        });
        response.code(status.created);
        return response;
    }

    const response = h.response({
        status: errorStatus,
        message: 'Buku gagal ditambahkan'
    });
    response.code(status.error);
    return response;
}

const getBooksController = (request, h) => {
    const { reading, finished, name } = request.query;
    let filteredBook = books
    if (reading) {
        filteredBook = filteredBook.filter((b) => b.reading == (reading == 1));
    }
    if (finished) {
        filteredBook = filteredBook.filter((b) => b.finished == (finished == 1));
    }
    if (name) {
        filteredBook = filteredBook.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()))
    }
    const response = h.response({
        status: successStatus,
        data: { books: JSON.parse(JSON.stringify(filteredBook, ['id', 'name', 'publisher'])) }
    });
    response.code(status.success);
    return response;
};

const getDetailBookController = (request, h) => {
    const { bookId } = request.params;
    const book = books.filter((b) => b.id === bookId)[0];
    if (book !== undefined) {
        return {
            status: successStatus,
            data: { book }
        }
    }
    const response = h.response({
        status: errorStatus,
        message: 'Buku tidak ditemukan'
    });
    response.code(status.notfound);
    return response;
}

const editBookController = (request, h) => {
    const { bookId } = request.params;
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading
    } = request.payload;

    if (!name) {
        const response = h.response({
            status: errorStatus,
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });
        response.code(status.bad);
        return response;
    }
    if (readPage > pageCount) {
        const response = h.response({
            status: errorStatus,
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(status.bad);
        return response;
    }

    const updatedAt = new Date().toISOString();
    const finished = pageCount == readPage;
    const index = books.findIndex((book) => book.id === bookId);
    if (index !== -1) {
        books[index] = {
            ...books[index],
            name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt, finished
        }
        const response = h.response({
            status: successStatus,
            message: 'Buku berhasil diperbarui'
        });
        response.code(status.success);
        return response;
    }

    const response = h.response({
        status: errorStatus,
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
    });
    response.code(status.notfound);
    return response;
}

const deleteBukuController = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex((book) => book.id === bookId);
    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: successStatus,
            message: 'Buku berhasil dihapus'
        });
        response.code(status.success);
        return response;
    }

    const response = h.response({
        status: errorStatus,
        message: 'Buku gagal dihapus. Id tidak ditemukan'
    });
    response.code(status.notfound);
    return response;
}

module.exports = {
    addBookController,
    getBooksController,
    getDetailBookController,
    editBookController,
    deleteBukuController
}