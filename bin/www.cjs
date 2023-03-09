#!/usr/bin/env node
const { config } = require('dotenv');
config();
const { set, connect } = require('mongoose');

/**
 * Module dependencies.
 */
let debug = require('debug')('express-starter:server');
let http = require('http');

(async () => {
    const app = (await import('../app.js')).default;

    /**
     * Get port from environment and store in Express.
     */

    let port = normalizePort(process.env.PORT || '3000');
    console.log(`starting on port ${port}`);
    app.set('port', port);

    /**
     * Create HTTP server.
     */

    let server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */

    set('strictQuery', true);
    console.log('trying to connect db');
    connect('mongodb+srv://Russ:pa55word@cluster0.sseiyjf.mongodb.net/AimLabBasic').then(() => {
        console.log('successfully connected to mongodb');
        server.listen(port);
    });
    server.on('error', onError);
    server.on('listening', onListening);

    /**
     * Normalize a port into a number, string, or false.
     */

    function normalizePort(val) {
        let port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */

    function onListening() {
        let addr = server.address();
        let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }
})().catch((err) => console.error(err));
