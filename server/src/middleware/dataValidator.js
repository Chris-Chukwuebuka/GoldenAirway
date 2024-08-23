

const checkAdminData = (req, res, next) => {
    const { email, userName} = req.body;


    if (!email || !userName) {
        return res.status(403).json({ error: "All Input fields are required" });
    }
    //check if the email is valid
    if(!email.includes("@") || !email.includes(".")){
        return res.status(403).json({ error: "Invalid Email Address" });
    }
    //check if the first name is valid and not too long or too short
    if(userName.length < 3 || userName.length > 50){
        return res.status(403).json({ error: "First Name must be between 3 and 50 characters" });
    }

    
    next();
};

//Password Validator
const checkPasswordsValidity = (req, res, next) => {

    const { password} = req.body;

  //compare the password and confirm password  
if (!password) {
    return res.status(403).json({ error: "All Password Input fields are required" });
    
}


//check if the password is not less than 8 characters
if (password.length < 8) {
    return res.status(403).json({ error: "Password must be at least 8 characters" });

}
next();

};
//export the functions
module.exports = { checkAdminData, checkPasswordsValidity };