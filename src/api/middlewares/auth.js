const jwt = require('jsonwebtoken')
const auth = async (req, res, next) => {

    try {

        let token = req.headers.authorization;

        if(token) {
            token = token.split(" ")[1]
            let student = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.SID = student.id
        }

        else {
            res.status(401).send("Unauthorized")
        }

        next();
    }

    catch (error) {
        console.log(error)
        res.status(401).json({ErroMessage: "Unauthorized"})
    }

}

module.exports = auth