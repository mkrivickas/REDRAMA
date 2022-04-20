const RegModel = require("./../models/registrationModel");

exports.loginUser = async(req, res) =>{
    const userExists = await RegModel.exists({ name: req.body.name });
    if (userExists) console.log("User exists");

    RegModel.findOne({ name: req.body.name },function (err, person) {
        // Prints "Space Ghost is a talk show host".
        console.log(person);
        res.status(201).json({
            status: "Success",
            user: person
        });
      });

    /* if (!userExists){
        try{
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
    } */
}