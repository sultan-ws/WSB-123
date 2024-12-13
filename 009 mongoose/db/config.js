const { default: mongoose } = require("mongoose");
const url = 'mongodb+srv://sultankhan:sj1XtNfoMKK1If1T@sultan.luvya.mongodb.net/wsb_123_tmp?retryWrites=true&w=majority&appName=sultan'

mongoose.connect(url)
    .then(() => {
        console.log('databse connected');
    })
    .catch((error) => {
        console.log(error);
    });