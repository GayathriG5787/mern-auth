import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
    const {token} = req.cookies;

    if (!token) {
        return res.json({success: false, message: "Not Authorized. Login again."});
    }

    try {

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {

            if (!req.body) req.body = {};

            req.body.userId = tokenDecode.id;

            next();
        } else {
            return res.json({success: false, message: "Not Authorized. Login again."
            });
        }

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export default userAuth;