const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
        if (existingUser) {
            return res.status(203).json({ message: 'Email or mobile already registered', success: false });
        }

        const user = new User({ name, email, mobile, password });
        await user.save();

        res.status(200).json({
            data: user,
            message: "user created successfully!",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(203).json({ message: 'User not found with this email id', success: false });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(203).json({ message: 'Invalid Password', success: false });

        res.status(200).json({ message: "user login successfully!", success: true, data: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message, success: false });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findOne({ token: req.headers.token }).select("+password");

        if (!user) {
            return res.status(204).json({ message: "User not found.", success: false });
        }

        res.status(200).json({
            message: "User details fetched successfully.",
            success: true,
            data: user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message, success: false });
    }
};
