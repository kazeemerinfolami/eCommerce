const mongoose = require("mongoose");
const crypto = require("crypto");
//to create a unique id
const uuid1 = require("uuid");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
      maxlength: 40,
    },
    email: {
      type: String,
      trim: true,
      require: true,
      unique: 32,
    },
    about: {
      type: String,
      require: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: String,
      default: [],
    },
    hashPassword: {
      type: String,
      require: true,
    },
    salt: {
      type: String,
    },
  },
  { timestamps: true }
);

//virtual field

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuid1();
    this.hashPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("Ecommerce", userSchema);
