const {Schema, model, trusted} = require('mongoose');

const Student = new Schema({
    hash: {type: String, requiried: true},
    first_name: {type: String, requiried: true},
    last_name: {type: String, requiried: true},
    middle_name: {type: String},
    gender: {type: String},
    birthday: {type: Date, requiried: true},
    experience: {type: Date},
    belt: {type: String},
    grade: {type: Number},
    contact: {type: String},
    document_type: {type: String},
    document_number: {type: String}
})

module.exports = model('Student', Student);