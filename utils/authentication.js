import JWT from "jsonwebtoken";

function createTokenForUser(user){
    const payload={
        _id: user._id,
        email:user.email,
        profileImageURL: user.profileImageURL,
        role:user.role
    }
    const token= JWT.sign(payload, process.env.JWT_SECRET)
    return token;
}

function validateToken(token){
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        //console.error('Invalid token:', error);
        return undefined;
    }
}

export{
    createTokenForUser,
    validateToken
}