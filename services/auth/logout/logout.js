const logoutUtil = require('./utils/utils')
const tokenUtils = require('./utils/tokenUtils')
const Token = require('../../../models/Token')


const logoutService = async (bodyData , headers) => {

    try{ 
        const {userId}  = bodyData
        if(!userId){

            throw new Error (' user id required for logout ')
        } 

        const token = headers.authorization.split(' ')[1];

       

        await logoutUtil.userLogout(userId)
       
        await Token.findOneAndUpdate({ userId, token }, { $set: { status: false } });

        tokenUtils.addTokenToBlacklist(token);


        return {success : true , message : 'Logout Sucessfully'}

    }
    catch(error){
        console.error('Error in logoutservice' , error)
        throw new Error ('Logout failed')
    }
};

module.exports ={
logoutService,

}