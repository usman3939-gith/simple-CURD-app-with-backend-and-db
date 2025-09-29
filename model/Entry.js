const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    entry: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Entry', entrySchema);
