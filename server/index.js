import dotenv from 'dotenv'

import app from './app.js'

// handling Uncaught exceptions
// eg.: try {console.log(nh);} without handling Uncaught Exceptions
process.on('uncaughtException', (errr) => {
    console.log(`Error: ${errr.message}`);
    console.log(`Shutting down the server due to uncaught Exceptions`);

    process.exit(1)
})
// console.log(nh);

// env config
dotenv.config({ path: './config/config.env' })

// db connections
import connectDatabase from './config/database/connectDatabase.js';
connectDatabase();

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


// handling unhandled promise rejection
// example:- try giving wrong DB_URI
process.on('unhandledRejection', (errr) => {
    console.log(`Error: ${errr.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1)
    })
})