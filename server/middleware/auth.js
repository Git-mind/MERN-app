// 1:43:40 YT timestamp - auth middleware for 
//npm install jsonwebtoken --save
import jwt from 'jsonwebtoken';

// wants to like a post
// click the like button => auth middleware (next) => like controller...
// auth middlewre confirms or deny that request

const auth = async(req, res, next) => {
    // after user is sign up or sign in, user will get a token
    // check if user token is valid to do other actions on the web application
    try {
        const token = req.headers.authorization.split(" ")[1];
        
        //if length is greater than 500 means it is using google Auth
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth){
            // verify token gives us the data that contain username and id 
            // "test" is the secrets
            decodedData = jwt.verify(token, "test");

            req.userId = decodedData?.id;

        } else{
            //jwt.decode - decode payload without verifying the signature/secrets
            decodedData = jwt.decode(token);

            // sub is a google name for a specific id that differentiate every single google user

            req.userId = decodedData?.sub;

            
        }

        // if there is no errors, means user is authenticated to like the post
        next();
        // 1:49:00
        // go to routes and controller

    } catch (error) {
        console.log(error);
    }
}

export default auth;