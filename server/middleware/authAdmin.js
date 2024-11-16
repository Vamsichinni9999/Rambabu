const Users = require('../model/userModel.js');

const authAdmin = async (req, res, next) => {
    try {
        // Fetch the user from the database using the ID from the JWT
        const user = await Users.findOne({ _id: req.user.id });

        // Check if the user is an admin
        if (user.role === 0) return res.status(401).json({ msg: "Admin resources are denied" });

        next(); // Proceed if the user is an admin
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = authAdmin;
