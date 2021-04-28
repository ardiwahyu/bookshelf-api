const {
    addBookController,
    getBooksController,
    getDetailBookController,
    editBookController,
    deleteBukuController
} = require('../controllers/bookController');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookController
    },
    {
        method: 'GET',
        path: '/books',
        handler: getBooksController
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getDetailBookController
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBookController
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBukuController
    }
]

module.exports = routes;