const User = require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
exports.register = async (req, res) => {
    try {

        const user = await User.create(req.body);
        res.status(201).json({
            message: "user registerd successfully",
            status: true,
            user
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: false,

        })
    }


}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "pls enter all details",
                status: false
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "user not found",
                status: false
            });
        }
        if (!user.status) {
            return res.status(403).json({
                message: "Your account has been deactivated by admin",
                status: false,
            });
        }
        const isMatched = await bcrypt.compare(password, user.password);
        console.log("password matched------->", isMatched);
        if (!isMatched) {
            return res.status(401).json({
                message: "invalid credential",
                status: false
            });
        }
        const options = {
            userId: user._id,
            userRole: user.role

        }


        const token = jwt.sign(options, process.env.JWT_SECRET_KEY, { expiresIn: "50m" });
        console.log("token-------->", token);


        res.status(200).cookie('token', token).json({
            message: "user logged in successfully",
            status: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }


}
exports.logout = (req, res) => {
    try {
        res.status(200).clearCookie('token').json({
            message: "user logged out successfully",
            status: true
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }


}
exports.profileUpdate = async (req, res) => {
    const { userId } = req;
    const { email, fullName, mobileNumber, area, wardNumber, houseName } = req.body;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: "user is not found",
            status: false
        });
    }
    if (email) {
        user.email = email
    }
    if (fullName) {
        user.fullName = fullName
    }
    if (mobileNumber) {
        user.mobileNumber = mobileNumber
    }
    if (wardNumber) {
        user.wardNumber = wardNumber
    }
    if (houseName) {
        user.houseName = houseName
    }
    await user.save();

    res.status(200).json({
        message: "user profile updated successfully",
        status: true,
        user
    })
}
exports.passwordUpdate = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const { userId } = req;
        if (!userId) {
            return res.status(400).json({
                message: " not found",
                status: false
            });
        }
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message: "pls enter current and new password",
                status: false
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "user not found",
                status: false
            });

        }

        const isMatched = await bcrypt.compare(currentPassword, user.password);
        if (!isMatched) {
            return res.status(401).json({
                message: "current password is wrong",
                status: false
            })
        }
        user.password = newPassword
        await user.save();


        res.status(200).json({
            message: "user password updated succsfully",
            status: true
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }

}
exports.viewProfile = async (req, res) => {
    try {
        const { userId } = req;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: false,
            });
        }

        res.status(200).json({
            message: "Profile fetched successfully",
            status: true,
            user,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};
