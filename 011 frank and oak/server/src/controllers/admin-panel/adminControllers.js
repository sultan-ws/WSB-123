const Admin = require("../../models/admin");
const fs = require('fs');
const nodemailer = require('nodemailer');

const otpData = new Map();

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

        const filepath = `${req.protocol}://${req.get('host')}/frankandfiles/admin/`;

        const adminData = ifAdmin._doc;
        const data = {
            ...adminData,
            profile: filepath + adminData.profile,
            logo: filepath + adminData.logo,
            favicon: filepath + adminData.favicon,
            footer_icon: filepath + adminData.footer_icon,
        }
        res.status(200).json({message: 'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
}

const updateAdmin = async (req, res) => {
    try{
        const preData = await Admin.findOne(req.params);

        const data = req.body;

        if(req.files.profile){
            data.profile = req.files.profile[0].filename;
            const path = `./src/files/admin/${preData.profile}`;
            if(fs.existsSync(path)) fs.unlinkSync(path)
        };

        if(req.files.logo){
            data.logo = req.files.logo[0].filename;
            const path = `./src/files/admin/${preData.logo}`;
            if(fs.existsSync(path)) fs.unlinkSync(path)
        }

        if(req.files.favicon){
            data.favicon = req.files.favicon[0].filename;
            const path = `./src/files/admin/${preData.favicon}`;
            if(fs.existsSync(path)) fs.unlinkSync(path)
        }

        if(req.files.footer_icon){
            data.footer_icon = req.files.footer_icon[0].filename;
            const path = `./src/files/admin/${preData.footer_icon}`;
            if(fs.existsSync(path)) fs.unlinkSync(path)
        }

        const response = await Admin.updateOne(
            req.params,
            {
                $set: data
            }
        );

        res.status(200).json({message:'success'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
}

const genrateOtp = async (req, res) => {
    try{
        const ifAdmin = await Admin.find();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            }
        });

        const otp = Math.floor(Math.random() * 999999);

        otpData.set(ifAdmin[0].email, otp);

        const options = {
            from: process.env.EMAIL,
            to: ifAdmin[0].email,
            subject: 'OTP',
            text: `Your OTP is ${otp}`
        }

        transporter.sendMail(options, (error, success)=>{
            if(error) console.log(error);
            res.status(200).json({message:'success'});
        })
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
};

const updateEmail = async (req, res) => {
    try{
        const { otp, email, newemail } = req.body;

        
        const sentOtp = otpData.get(email);

        console.log(otp, email, newemail, sentOtp, req.params);

        if(!otp) return res.status(400).json({message: 'please send otp'});
        if( otp != sentOtp) return res.status(401).json({message: 'invalid otp'});

        const response = await Admin.updateOne(
            req.params,
            {
                $set:{
                    email: newemail
                }
            }
        );

        res.status(200).json({message:'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
} 

module.exports = {
    createAdmin,
    adminLogin,
    updateAdmin,
    genrateOtp,
    updateEmail
}