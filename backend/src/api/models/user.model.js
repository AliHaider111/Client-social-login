const mongoose = require("mongoose");

/**
 * User Schema
 * @private
 */

const UserSchema = new mongoose.Schema({
    profileImage: { type: String },
    name: { type: String, default: "" },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String },
    password: { type: String, required: true },
    emailVerified: { type: Boolean },
    facebookLink: { type: String },
    twitterLink: { type: String },
    socialAccessToken: { type: String },
    socialRefreshToken: { type: String },
    accessToken: { type: String },
    refreshToken: { type: String },
    isEmailVerified: { type: Boolean, default: false },

},
    { timestamps: true })

/**
 * @typedef User
 */

module.exports = mongoose.model("users", UserSchema);