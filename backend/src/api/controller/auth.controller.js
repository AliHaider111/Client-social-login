const User = require("../models/user.model")
const bcrypt = require("bcrypt");

var jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {

        var { firstName, lastName, email, password, repeatPassword } = req.body;
        if (email && password && repeatPassword) {
            if (password !== repeatPassword)
                return res.status(200).send({ success: false, message: "Password do not match" })

            email = email.toLowerCase();
            let user = await User.findOne({ email });

            if (user) {
                return res
                    .status(200)
                    .send({ success: false, message: "User already exists" });
            }

            const hashPassword = await bcrypt.hash(password, 10)
            let payload = {
                firstName, lastName, email, password: hashPassword
            }

            user = await User.create(payload);

            return res.status(200).send({
                success: true,
                message: "User created successfully",
                user
            })

        } else
            return res.status(200).send({
                success: false,
                message: "Required fields are missing",
            })

    } catch (error) {
        next(error)
    }


}

exports.login = async (req, res, next) => {
    try {
        let { email, password } = req.body;

        if (email && password) {

            let user = await User.findOne({ email })
            if (user) {
                const comapre = await bcrypt.compare(password, user.password);
                if (!comapre) {
                    return res.status(200).send({
                        success: false,
                        message: "Password doesn't match."
                    })
                }
                const payload = {
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 48),
                    data: user?._id,
                }
                const token = jwt.sign(payload, TOKEN)
                return res
                        .status(200).send({
                            success: true,
                            message: "User signed in successfully",
                            accessToken: token
                        })
            }else{
                return res.status(401).send({success: false, message: "Email not valid"})
            }

        } else {
            return res.status(200).send({
                success: false,
                message: "Required fields are missing",
            })
        }
    } catch (error) {
        next(error)
    }

}
