const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardSchema = new Schema({
    cardID: {
      type: String,
      unique: true
    },
    listID: String,
    term: Date,  // срок выполнения
    start: Date, 
    end: Date, 
    spent: Number, // потрачено времени в секундах
    income: Number // получено баллов
  });

module.exports = mongoose.model('CardModel', cardSchema );