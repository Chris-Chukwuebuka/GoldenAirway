const generateOTP = () => {

    /**
     * @method generateOTP
     * @description generates a 6 digit random number
     */
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };
  
  module.exports = {generateOTP}