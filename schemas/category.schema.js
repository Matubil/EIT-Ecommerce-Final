const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLenght: 3,
        maxLenght: 50,
        unique: true
    },
    description: String,
});

module.exports = mongoose.model('Category', CategorySchema)