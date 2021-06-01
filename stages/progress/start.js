const mongoose = require('mongoose');
const Card = require('../../models/card');

module.exports = async function(card) {
    let filter = {cardID: card}
    let update = {start: new Date().getTime()}
    return await Card.findOneAndUpdate(filter, update);
}