const Hapi = require('@hapi/hapi');
const routes = require('./routes/bookRoute')
const dotenv = require('dotenv');
dotenv.config()

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        }
    })

    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();