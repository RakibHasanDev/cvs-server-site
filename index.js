const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const stripe = require('stripe')( )
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

// console.log(process.env.STRIPE_SECRET_KEY)

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.h32cfqq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// console.log(uri)

const usersCollection = client.db('googlecontact').collection('users');

async function run() {
    try {
        
      
        app.put('/users', async (req, res) => {
            const email = req.body.email;
            const data = req.body;
            // console.log(data, email)
            const query = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                  
                    email: data.email,
                   
                }
            };
            const result = await usersCollection.updateOne(query, updateDoc, options);
            res.send(result)

        })

        app.get('/allUsers', async (req, res) => {
            const query = {};
            const users = await usersCollection.find(query).toArray();
            res.send(users);
        });


    }
    finally {
        
    }
}
run().catch(console.log);



app.get('/', async (req, res) => {
    res.send('google contact server is running');
})

app.listen(port, () => console.log(`google contact server is running on ${port}`))