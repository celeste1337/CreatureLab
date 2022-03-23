const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://dbadmin:L5J1QMP3s6arJ6dh@cluster0.soskd.mongodb.net/CreatureLab?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();

    const database = client.db('CreatureLab');
    const parts = database.collection('bodyparts');

    // Query for a movie that has the title 'Back to the Future'
    const query = { creatureId: 'Tq5g' };
    const test = await parts.findOne(query);

    console.log(test);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);