const mongoose = require('mongoose');

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_CLUSTER } = process.env;

mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@sultan.luvya.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=${DB_CLUSTER}`)
.then(()=>{
    console.log('database connected...');
})
.catch((error)=>{
    console.log(error);
});