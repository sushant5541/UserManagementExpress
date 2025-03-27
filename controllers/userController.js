let User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



let register = async (req, res) => {

    try {
    let { name, email, password} = req.body
    console.log( name, email, password)

    if (!name || !email || !password) {
        return res.status(400).send("Name, email, and password are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "Email already registered"
        });
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);


    let user = new User({name, email, password})
    await user.save()
    res.status(200).send("registration successful")

} catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
}

}

let login = async (req, res) => {
    let {inp_email, inp_password} = req.body

    let user = await User.findOne(
        {email:inp_email})

    let isValidPWD = await bcrypt.compare(inp_password, user.password)

        if(!isValidPWD){
            res.status(400).send("user not found")
        }


        let payload = {id:user.id}


        try {jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn:'1h'
            }, (err, token) => {
                if(err){
                    throw err
                }
                else{
                    res.send(token)
                }
            })
        } catch (err){
                console.log("Error singin jwt!")
                
            }
        }




let profile = async (req, res) => {
    res.status(200).send(req.user)
}




let transaction = async (req, res) => {
    res.status(200).send("This is transaction Page")
}

let wishlist = async (req, res) => {

    res.status(200).send("This is wishlist Page")
}

module.exports = {      
    register,
    login,
    profile,
    transaction,
    wishlist
}