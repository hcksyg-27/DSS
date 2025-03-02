const jwt =  require("jsonwebtoken");

module.exports = function(req, res, next) {
    try{
        //get token from header
        const token = req.header('Authorization');
        if(!token){
            return res.status(401).json({error: "Access denied. No token provided."});
        }

        //verify and decode the token
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded;//attach user data to request
        next();//continue to the next middleware or routes handler
    }catch(err){
        res.status(400).json({error: 'Invalid token.'});
}
};