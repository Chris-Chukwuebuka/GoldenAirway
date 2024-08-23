const bcrypt = require("bcryptjs");


//hash password
const hashPassword =  (plainText) => {
    const salt =  bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(plainText, salt);

    return hashedPassword;
};

//verify password   
const verifyPassword = (providedPassword, hashedPassword) => {
return bcrypt.compareSync(providedPassword, hashedPassword);
}


//export the functions
module.exports = { hashPassword, verifyPassword};