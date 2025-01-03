const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name:String,
    profile:String,
    fb:String,
    instagram:String,
    youtube:String,
    twitter:String,
    logo:String,
    favicon:String,
    footer_icon:String,
    email:String,
    password:String
});

const Admin = mongoose.model('admins', adminSchema);

module.exports = Admin;