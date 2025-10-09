import User from '../models/user.mode.js'

export const getCurrentUser = async (req, res) => {
    console.log("curr user")
    try {
        let id = req.userId
        const user = await User.findById(id).select("-password")
        if (!user) return res.status(404).json({ msg: "User not found" })
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message)

        res.status(500).json({ msg: "get current user failed" })
    }
}

export const getAdmin = async (req, res) => {
    try {
        let adminEmail = req.adminEmail

        if (!adminEmail) return res.status(404).json({ msg: "admin not found" })
        return res.status(200).json({
            email: adminEmail,
            role: "admin"
        })
    } catch (error) {
        console.log(error.message)

        res.status(500).json({ msg: "get admin  failed" })
    }
}