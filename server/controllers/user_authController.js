import { User } from "../models/userModel.js";

/*--------------------------------
        1) user sign in page
---------------------------------*/
export const signin = async (req, res) => {

    const { email, password } = req.body;

    // take the get the data of the user by using the email 
    // check the password with encrypted password

    res.status(200).json({
        success: true,
        message: "Login sucessFull",
    })
}


/*--------------------------------
       2) user sign up page
---------------------------------*/

export const signup = async (req, res) => {

    const { FirstName, LastName, PhoneNumber, Email, Password } = req.body;
    if (!FirstName || !LastName || !PhoneNumber || !Email || !Password) {
        return res.status(400).json({
            success: false,
            message: "Required data is missing."
        });
    }

    const existingUser = await User.findOne({
        $or: [{ Email: Email.toLowerCase() }, { PhoneNumber }],
    });


    console.log(existingUser);
    const userdata = {
        FirstName: FirstName,
        LastName: LastName,
        PhoneNumber: PhoneNumber,
        Email: Email,
        Password: Password
    }

    if(existingUser){

        res.status(401).json({
            success:false,
            message:"user already exists !"
        })
    }
    else{

        const newUser=new User(
            userdata
        )

        await newUser.save();
    }

    res.status(200).json({
        success: true,
        message: "sign-up sucessfull !",
        data: userdata
    })
}



