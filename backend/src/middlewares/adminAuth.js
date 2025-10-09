import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(500).json({ message: " Not Authorized login" })
        }

        const verifyToken = await jwt.verify(token, process.env.JWT_SECRET)
        if (!verifyToken) {
            return res.status(400).json({ message: "admin doesn't have valid token" })
        }
        req.adminEmail = process.env.ADMIN_EMAIL
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "adminAuth  error" })
    }
}

export default adminAuth