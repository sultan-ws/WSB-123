const Admin = require("../../models/admin");

const createAdmin = async()=>{
    try{
        const ifAdmin = await Admin.find();
        if(ifAdmin.length > 0) return console.log('Admin => ',ifAdmin[0]);

        const data = new Admin({
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD
        });

        const response = await data.save();
        console.log( 'Admin => ',response);
    }
    catch(error){
        console.log(error);
    }
};

const adminLogin = async (req, res)=>{
    try{
        if(!req.body.email) return res.status(400).json({message: 'please send a email'});

        const ifAdmin = await Admin.findOne({email: req.body.email});
        if(!ifAdmin) return res.status(401).json({message: 'invalid email'});

        if(ifAdmin.password !== req.body.password) return res.status(401).json({message: 'invalid password'});
        res.status(200).json({message: 'success', data: ifAdmin});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
}

module.exports = {
    createAdmin,
    adminLogin
}