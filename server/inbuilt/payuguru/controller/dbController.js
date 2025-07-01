let mongo = require('mongodb');
let {MongoClient} = require('mongodb');
let mongoUrl = "mongodb://127.0.0.1:27017";
let client = new MongoClient(url)
let db;