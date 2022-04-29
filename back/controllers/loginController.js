const RegModel = require("./../models/registrationModel");

exports.loginUser = async(req, res) =>{
    const userExists = await RegModel.exists({ email: req.body.email });
    if (userExists){
    RegModel.findOne({ email: req.body.email },function (err, person) {
        // Prints "Space Ghost is a talk show host".
        console.log(person);
        res.status(201).json({
            status: "Success",
            user: person
        });
      });
    }else{
        res.status(404).json({
            status: "Fail"
        });
    }

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