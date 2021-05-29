import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    //db store
    const client = await MongoClient.connect('mongodb+srv://layachanx3:ph8BLRe7d4cLiQS@cluster0.0fazi.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({
      message: 'Meetup inserted!'
    });
  }
}

export default handler;
