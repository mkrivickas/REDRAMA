const RegModel = require("./../models/registrationModel");

exports.registerUser = async(req, res) =>{
    const userExists = await RegModel.exists({ name: req.body.name });
    const userEmailExists = await RegModel.exists({email: req.body.email})
    if (userExists) console.log("User exists");
    if (!userExists && !userEmailExists){
        try{
            const newUser = await RegModel.create(req.body);
            res.status(201).json({
                status: "success",
                data: {
                    user: newUser
                    
                },
            });
        } catch(err){
            res.status(400).json({
                status: "fail",
                message: err,
            })
        }
    }else{
        res.status(401).json({
            status: "fail",
            message: "user already exists"
        })
    }
}