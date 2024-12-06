const {MongoClient, ObjectId} = require('mongodb');

const url = 'mongodb://localhost:27017';

const client = new MongoClient(url);

const connect = async ()=>{
    await client.connect();
    const db = await client.db('123tmp');
    const users = await db.collection('users');
    const admins = await db.collection('admins');

    return { users, admins };
}

const insertData = async ()=>{
    const { users, admins } = await connect();

    // const response = await users.insertOne({
    //     name: 'John Doe',
    //     email: 'john@example.com',
    //     password: 'password123',
    // });

    const response = await users.insertMany([
        {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        },
        {
            name: 'John wick',
            email: 'john@example.com',
            password: 'password123',
        },
        {
            name: 'janny stathom',
            email: 'john@example.com',
            password: 'password123',
        }
    ])

    console.log(response);
};

// insertData();

const readData = async()=>{
    const { users, admins } = await connect();
    // const response = await users.find({name: 'John Doe'}).toArray();
    const response = await users.find().toArray();

    console.log(response);
};

readData();

const updateData = async()=>{
    const { users, admins } = await connect();
    const response = await users.updateOne(
        {
            name:'John Doe'
        },
        {
            $set:{
                password:'updated'
            }
        }
    );

    console.log(response);
};

// updateData();

const deleteData = async()=>{
    const { users, admins } = await connect();
    const response = await users.deleteOne({_id : new ObjectId('67529bcbd27d1a4caff46112') });
    console.log(response);
};
// deleteData();