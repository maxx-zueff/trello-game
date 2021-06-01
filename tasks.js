const express = require('express')
const app = express()
const port = 8000
const mongoose = require('mongoose');
const Card = require('./models/card');
const axios = require('axios');

// Progress
const progressStart = require('./stages/progress/start');

app.use(express.json())

// Trello webhook call http://zxzx.loca.lt/tasks
app.use('/tasks', function (req, res) {
    let data = req.body.action.data;

    console.log(req.body)
    
    if (data.listAfter) {
        
        // В Работе
        if (data.listAfter.id=="606962b2a2e02c0385d327af") {
    
            let newCard = new Card({
                cardID: data.card.id,
                listID: data.card.idList
            });
    
            newCard.save(function (err, doc) {
                // if (err) return handleError(err);
                console.log(doc);
            });

            progressStart(data.card.id).then(function(doc) {
                console.log(doc)
            })
    
        }
    
        // Готово
        if (data.listAfter.id == "606962b47780ba525ca155bc") {
    
            let newCard = new Card({
                cardID: data.card.id,
                listID: data.card.idList
            });
    
            newCard.save(function (err, doc) {
                // if (err) return handleError(err);
                console.log(doc);
            });
        }
    }

    res.send("LOL")
})

let amount = 0;

app.use('/action', function (req, res) {



    axios.get(`https://api.trello.com/1/boards/601cff9a2d0b4a1f2db114fa/cards?key=b1e978b658530aadcc7d45b48dba3027&token=320304e86a4a5c7c8a6b65e64ec3477141f4d811b916b42ade4a6eed74a12b23`).then(function (response) {

        if (response.data.length != amount) {
            amount = response.data.length;
            console.log(amount);
        }
      })
      .catch(function (error) {
        console.log("Ошибка");
      })
    
    res.send("LOL")
})

app.use('/github', function (req, res) {
    console.log(req.body)
    res.send("LOL")
})

app.use('/github-hook', function (req, res) {
    console.log(req.body)
    res.send("LOL")
})




mongoose.connect('mongodb+srv://max:SantaFanta@cluster0.k12zr.mongodb.net/trelloTasks?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function(err){
    if(err) return console.log(err);

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
});

