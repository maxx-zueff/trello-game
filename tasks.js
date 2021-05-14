const express = require('express')
const app = express()
const port = 8000
const mongoose = require('mongoose');
const Card = require('./models/card');
const {dbpass} = require('./config.json');

app.use(express.json())

// Trello webhook call http://zxzx.loca.lt/tasks
app.use('/tasks', function (req, res) {
    let data = req.body.action.data;
    
    if (data.listAfter) {
        
        // В Работе
        if (data.listAfter.id=="606962b2a2e02c0385d327af") {
    
            let newCard = new Card({
                cardID: data.card.id,
                listID: data.card.idList
            });
    
            newCard.save(function (err, doc) {
                if (err) return handleError(err);
                console.log(doc);
            });
    
        }
    
        // Готово
        if (data.listAfter.id == "606962b47780ba525ca155bc") {
    
            let newCard = new Card({
                cardID: data.card.id,
                listID: data.card.idList
            });
    
            newCard.save(function (err, doc) {
                if (err) return handleError(err);
                console.log(doc);
            });
        }
    }

    res.send("LOL")
})

mongoose.connect(`mongodb+srv://max:${dbpass}@cluster0.k12zr.mongodb.net/trelloTasks?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function(err){
    if(err) return console.log(err);

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
});

