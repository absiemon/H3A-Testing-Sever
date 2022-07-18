const { findById } = require("../models/user");
const User = require("../models/user");

// ----ROUTE-1 FOR USER REGISTRATION-----

module.exports.register = async (req, res, next) => {

    try{
        const {name, email, password, description} = req.body;
        // finding whether the name exists or not
        const useremailCheck = await User.findOne({email}); 
        if(useremailCheck){
            return res.json({msg:"User email already exists", status: false});
        }

        
        // if everything is correct thn we will encrypt the password with salt value
        // const hashedPassword = await bcrypt.hash(password,10 );

        //after encrypttion we will create the user in the db
        const user = await User.create({
            email,
            name,
            password: password,
            description,
        });
        //const user will have the instance of the user.i.e all the info of the use
        delete user.password; // removing the password from the response.
        return res.json({status: true, user})

    }
    catch(err){
        console.log({mgs:"Internal Sever eroor", err});
    }   
}

// ----ROUTE-2 FOR USER REGISTRATION-----
module.exports.login = async (req, res, next) => {

    try{
        const {email, password} = req.body;
        // finding whether the name in db 
        const findUser = await User.findOne({email}); 

        if(!findUser){
            return res.json({msg:"Email not exists", status: false});
        }
        // conmparing the entered password with the user password
        
        const isPasswordValid = await User.findOne({password});
        if(!isPasswordValid){
            return res.json({msg:"Incorrect password", status: false});
        }
        delete findUser.password;
        return res.json({status: true, findUser});

    }
    catch(err){
        console.log({mgs:"Internal Sever eroor", err});
    }   
}



module.exports.getUser = async (req, res, next) => {
    try {
        const users = await User.find({_id:{$ne: req.params.id}}). select([    //$ne means not selecting the id which is in params 
            "email",
            "name",
            "_id",
            "description"
        ])
        return res.json(users)
    } catch (error) {
        console.log({mgs:"Internal Sever eroor", err});
        
    }
}