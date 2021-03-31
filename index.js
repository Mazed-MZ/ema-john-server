const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kpa70.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const itemCollection = client.db("emaJohn").collection("products");
  
  app.post('/addItems', (req, res)=>{
      const selectedProduct = req.body;
      itemCollection.insertMany(selectedProduct)
      .then(result =>{
          console.log(result.insertedCount);
          res.send(result.insertedCount);
      })
  })

  app.get('/selectedProduct', (req, res) => {
      itemCollection.find({}).limit(20)
      .toArray( (err, documents) =>{
          res.send(documents);
      })
  })
});


app.listen(process.env.PORT || port)