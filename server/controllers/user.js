import bcrypt from 'bcryptjs';
// npm install bcrypt
// 1:29:00 YT timestamp
// bcrypt - is to hash the password 
// if you store password into the database as plaintext and your database is hacked, all your users password is exposed 


// jwt is to store the user in the browser for some period of time.
// if user leave the site, it will stay logged in
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

const secret = "test";

// complex logic of sign in and sign up for the user
export const signin = async(req, res) => {
    // destructuring the req.body - get just email and password from the post request body
    const { email, password } = req.body;

    try {
        // searching existing user from the database
        const existingUser = await User.findOne({ email });

        // if user doesnt exist in the database, return 404 error and message
        if(!existingUser) return res.status(404).json({message:"User doesn't exist."});

        // compare form Password matches existingUser password stored in database
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials."});

        // 'test' - a mock secret for jwt token
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, secret, { expiresIn: "1h"} )

        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        //undefined server error 500
        res.status(500).json({ message: "Something went wrong."});
    }
}

export const signup = async(req, res) => {
    console.log(req.body)
    const { email, password, confirmPassword ,firstName, lastName} = req.body;

    try {
        // searching existing user from the database
        const existingUser = await User.findOne({ email });
        console.log(existingUser)
        
        // if user doesnt exist in the database, return 404 error and message
        if(existingUser) return res.status(400).json({message:"User already exists."});

        if(password !== confirmPassword) return res.status(400).json({message:"Password don't match."})

        // store hashed password into database
        // bcrypt.hash(string, salt). Salt length is the level of difficulty to hash the password 
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});

        // 'test' - a mock secret for jwt token
        const token = jwt.sign({ email: result.email, id: result._id}, secret, { expiresIn: "1h"} )

        res.status(200).json({ result, token });


    } catch (error) {
        //undefined server error 500
        res.status(500).json({ message: "Something went wrong."});
    }


}
