const {Schema, model, trusted} = require('mongoose');

const User = new Schema({
    name: {type: String, requiried: true},
    login: {type: String, requiried: true, unique: true},
    password: {type: String, requiried: true},
    level: {type: Number, default: 1},
    update: {type: String},
    visit: {type: String},
    info: {type: String}
})

module.exports = model('User', User);