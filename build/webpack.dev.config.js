const path = require('path');

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        path: './src/index.ts'
    },
    output: {
        path: './dist'
    },

};
