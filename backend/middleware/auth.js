import jwt from 'jsonwebtoken'

const authMiddleware = async (req,res,next) => {
  
    const {token} = req.headers
    if(!token){
        return res.json({success:false,message:"Seems like something went wrong, Login again to continue"})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:"Oops! something went wrong, try again later"})
    }
}

  
export default authMiddleware
